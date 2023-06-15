import { usePlaylist } from '@jam/api-client';
import { PlaylistSegment } from '@jam/api-models';
import { resizeImage } from '@jam/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import TrackPlayer, { Capability, Event, useTrackPlayerEvents } from 'react-native-track-player';
import { trackCurrentSegmentEvent, trackPlayerStateToSystem } from '../../lib/tracking';
import { queueEmitter } from '../../lib/utils/queueEmitter';
import { end, next } from '../../lib/utils/sonics';
import { PlaybackSpeed } from '../../types';
import { JamTrack, TrackType } from '../../types/player';
import PlayerImageButton from './PlayerImageButton';
import PlayerSkipBackwards10 from './PlayerSkipBackwards10';
import PlayerSkipForward from './PlayerSkipForward';
import SpeedToggle, { SPEED_STORAGE_KEY } from './SpeedToggle';
import { addTracksToQueue } from './utils/addToPlaylist';
import { convertToTrackPlayerPlaylist } from './utils/segmentToTrack';

const TRACK_COMPLETION_TOLERANCE = 2;

const trackPlayerEvents = [
  Event.PlaybackError,
  Event.PlaybackState,
  Event.PlaybackTrackChanged,
  Event.PlaybackQueueEnded,
  Event.RemoteNext,
  Event.RemotePrevious,
  Event.RemoteSeek,
];

function Player() {
  const { data: playlist } = usePlaylist();
  const [isPlayerSetup, setIsPlayerSetup] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<PlaylistSegment | null>(playlist?.segments[0] ?? null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [nextSegment, setNextSegment] = useState<PlaylistSegment | null>(playlist?.segments[1] ?? null);
  const [speed, setSpeed] = useState<PlaybackSpeed>(PlaybackSpeed.One);

  // User event tracking
  useTrackPlayerEvents(trackPlayerEvents, async (event) => {
    const currentPosition = await TrackPlayer.getPosition();

    switch (event.type) {
      case Event.PlaybackState: {
        const trackingEvent = trackPlayerStateToSystem(event.state);
        if (trackingEvent) {
          await trackCurrentSegmentEvent(trackingEvent, currentSegment, currentPosition);
        }
        break;
      }
      case Event.PlaybackTrackChanged: {
        if (event.track !== undefined) {
          const track = (await TrackPlayer.getTrack(event.track)) as JamTrack;
          const trackCompleted = Math.abs(track.duration - event.position) < TRACK_COMPLETION_TOLERANCE;
          if (trackCompleted && track.trackType === TrackType.Segment) {
            await trackCurrentSegmentEvent('completed', currentSegment, currentPosition);
          }
        }
        break;
      }
      case Event.PlaybackQueueEnded: {
        await trackCurrentSegmentEvent('completed', currentSegment, currentPosition);
        break;
      }
      case Event.RemoteNext: {
        await trackCurrentSegmentEvent('next', currentSegment, currentPosition);
        break;
      }
      case Event.RemotePrevious: {
        await trackCurrentSegmentEvent('back', currentSegment, currentPosition);
        break;
      }
      case Event.RemoteSeek: {
        await trackCurrentSegmentEvent('seek', currentSegment, currentPosition);
        break;
      }
      case Event.PlaybackError: {
        await trackCurrentSegmentEvent('playError', currentSegment, currentPosition, {
          message: event.message,
          code: event.code,
        });
        break;
      }
      default:
    }
  });

  useEffect(() => {
    async function setupAudioPlayer() {
      try {
        await TrackPlayer.setupPlayer();
      } catch (e) {
        if (e.code === 'player_already_initialized') {
          setIsPlayerSetup(true);
        }
      }

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      const storedSpeed = await AsyncStorage.getItem(SPEED_STORAGE_KEY);
      if (storedSpeed) {
        await TrackPlayer.setRate(parseFloat(storedSpeed));
        setSpeed(parseFloat(storedSpeed) as PlaybackSpeed);
      }

      setIsPlayerSetup(true);
    }

    if (!isPlayerSetup) {
      setupAudioPlayer();
    }
  }, [isPlayerSetup]);

  useEffect(() => {
    async function AddPlaylist(playlistSegments: PlaylistSegment[]) {
      const tracks = convertToTrackPlayerPlaylist(playlistSegments);
      await addTracksToQueue(tracks);
    }

    if (playlist && playlist.segments && isPlayerSetup && playlist.segments.length > 0) {
      AddPlaylist(playlist.segments);
    }
  }, [isPlayerSetup, playlist]);

  useEffect(() => {
    async function updateCurrentAndNextSegment() {
      const queue = (await TrackPlayer.getQueue()) as JamTrack[];
      const trackIndex = await TrackPlayer.getCurrentTrack();
      const currentTrack = trackIndex !== undefined ? queue[trackIndex] : null;

      if (currentTrack) {
        setCurrentSegment(currentTrack.segment);
        setCurrentTrackIndex(trackIndex);

        if (currentTrack.segment.id === queue[queue.length - 1].segment.id) {
          setNextSegment(null);
          return;
        }

        const nextTrack = currentTrack.trackType === TrackType.Intro ? queue[trackIndex + 2] : queue[trackIndex + 1];

        if (nextTrack) {
          setNextSegment(nextTrack.segment);
        }
        queueEmitter.updated();
      }
    }

    const playbackTrackChanged = TrackPlayer.addEventListener(Event.PlaybackTrackChanged, async (event) => {
      updateCurrentAndNextSegment();
      if (event.nextTrack === event.track + 1) {
        const queue = (await TrackPlayer.getQueue()) as JamTrack[];
        const currentTrack = queue[event.track];
        if (
          currentTrack.trackType === TrackType.Segment &&
          Math.floor(currentTrack.duration) === Math.floor(event.position)
        ) {
          next.play();
        }
      }
    });

    const endOfPlaylist = TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
      end.play();
    });

    return () => {
      playbackTrackChanged.remove();
      endOfPlaylist.remove();
    };
  }, [currentSegment, currentTrackIndex, isPlayerSetup, nextSegment, playlist]);

  const onSpeedChange = useCallback(
    async (nextSpeed: PlaybackSpeed) => {
      await AsyncStorage.setItem(SPEED_STORAGE_KEY, nextSpeed.toString());
      await TrackPlayer.setRate(nextSpeed);
      setSpeed(nextSpeed);
      const position = await TrackPlayer.getPosition();
      await trackCurrentSegmentEvent('speedChange', currentSegment, position, { speed: nextSpeed });
    },
    [currentSegment],
  );

  const onSkipBackwards = useCallback(
    async (seconds: number) => {
      const position = await TrackPlayer.getPosition();
      const newPosition = position - seconds < 0 ? 0 : position - seconds;
      await TrackPlayer.seekTo(newPosition);
      await trackCurrentSegmentEvent('skipBackward', currentSegment, position);
    },
    [currentSegment],
  );

  const showPlayer = playlist?.segments && isPlayerSetup && playlist.segments.length > 0 && currentSegment;

  return (
    <View className="flex m-2 flex-row h-16 bg-gray-6 dark:bg-black-1 rounded-2xl">
      {showPlayer && (
        <>
          <PlayerImageButton imageURI={resizeImage(currentSegment.stream.image_url)} />
          <View className="w-4/5 flex-row">
            <View className="w-1/2">
              <Text className="text-black-0 mt-3 w-full font-sans-bold dark:text-white" numberOfLines={1}>
                {currentSegment.title}
              </Text>
              {nextSegment && (
                <Text className="text-black-0 mt-1 w-full font-sans-normal dark:text-white" numberOfLines={1}>
                  Next: {nextSegment.title}
                </Text>
              )}
            </View>
            <View className="flex flex-row w-1/2 px-2 justify-around items-center">
              <PlayerSkipBackwards10 onSkipBackwards={onSkipBackwards} />
              <SpeedToggle onSpeedChange={onSpeedChange} speed={speed} />
              <PlayerSkipForward />
            </View>
          </View>
        </>
      )}
      {!showPlayer && <ActivityIndicator className="m-auto h-8 w-8" />}
    </View>
  );
}

export default Player;
