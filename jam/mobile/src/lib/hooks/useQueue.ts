import { PlaylistSegment } from '@jam/api-models';
import { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { JamTrack, TrackType } from '../../types/player';
import { QUEUE_UPDATED } from '../utils/queueEmitter';

const useQueue = (): { queue: JamTrack[]; currentSegment: PlaylistSegment } => {
  const [queue, setQueue] = useState<JamTrack[]>([]);
  const [currentSegment, setCurrentSegment] = useState<PlaylistSegment | undefined>(null);

  const updateQueue = useCallback(async () => {
    const newQueue = ((await TrackPlayer.getQueue()) as JamTrack[]).filter((t) => t.trackType !== TrackType.Intro);
    const newCurrentSegment = (await TrackPlayer.getCurrentTrack()) || 0;
    const track = await TrackPlayer.getTrack(newCurrentSegment);
    setCurrentSegment(track.segment);
    setQueue(newQueue);
  }, []);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(QUEUE_UPDATED, updateQueue);
    return () => {
      subscription.remove();
    };
  }, [updateQueue]);

  return { queue, currentSegment };
};

export default useQueue;
