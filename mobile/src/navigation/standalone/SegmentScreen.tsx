import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icons } from '@jam/web-icons';
import { useSegmentById, useAggregationStreamsInclude, useHasAccessToSegment } from '@jam/api-client';
import TrackPlayer from 'react-native-track-player';
import styled from 'styled-components/native';
import SegmentDateDurationDetails from '../../components/segment/SegmentDateDurationDetails';
import Button from '../../components/Button';
import SegmentNotes from '../../components/segment/SegmentNotes';
import { RootStackParamList } from '../../types/navigation';
import useIsPlaying from '../../lib/hooks/useIsPlaying';
import { JamTrack } from '../../types/player';
import playFromSegment from './util/playFromSegment';
import StreamCoverImage from '../../components/StreamCoverImage';
import { TextH1, TextH3, TextLink3 } from '../../components/text';
import showSubsMessage from '../../lib/utils/subs-message';
import removeFromPlaylist from '../../components/player/utils/removeFromPlaylist';
import { addStreamToPlaylist } from '../../components/player/utils/addToPlaylist';

type SegmentProps = NativeStackScreenProps<RootStackParamList, 'Segment'>;

const CenteredTitleText = styled(TextH1)`
  text-align: center;
`;

const CenteredSmallText = styled(TextLink3)`
  text-align: center;
`;

export default function SegmentScreen({ navigation, route }: SegmentProps) {
  const { segmentId, stream } = route.params;
  const { data: segment } = useSegmentById(stream.id, segmentId);
  const { data: userAggregationStreamsInclude } = useAggregationStreamsInclude();
  const [isFollowingStream, setIsFollowingStream] = useState(false);
  const [isChangingFollowStatus, setIsChangingFollowStatus] = useState(false);
  const isTrackPlayerPlaying = useIsPlaying();
  const [isSegmentPlaying, setIsSegmentPlaying] = useState(false);
  const hasAccess = useHasAccessToSegment(segment);

  useEffect(() => {
    if (stream && userAggregationStreamsInclude) {
      const aggregationStreamInclude = userAggregationStreamsInclude.data.find((aSI) => aSI.stream?.id === stream.id);
      setIsFollowingStream(!!aggregationStreamInclude);
    }
  }, [userAggregationStreamsInclude, stream]);

  useEffect(() => {
    const updatePlayingStatus = async () => {
      const currentTrackIndex = await TrackPlayer.getCurrentTrack();
      const currentTrack = (await TrackPlayer.getTrack(currentTrackIndex)) as JamTrack;
      setIsSegmentPlaying(currentTrack.segment.id === segmentId && isTrackPlayerPlaying);
    };

    updatePlayingStatus();
  }, [isTrackPlayerPlaying, segmentId]);

  const isPaidStream = stream.StripePrice?.length;

  const changeFollowStatus = useCallback(async () => {
    setIsChangingFollowStatus(true);
    if (isFollowingStream && !isPaidStream) {
      await removeFromPlaylist(stream.id);
      setIsFollowingStream(false);
    } else if (isFollowingStream && isPaidStream) {
      await showSubsMessage({ variant: 'unfollow', segmentId, streamId: stream?.id });
    } else if (isPaidStream) {
      await showSubsMessage({ variant: 'follow', segmentId, streamId: stream?.id });
    } else {
      await addStreamToPlaylist(stream.id);
      setIsFollowingStream(true);
    }
    setIsChangingFollowStatus(false);
  }, [isFollowingStream, isPaidStream, segmentId, stream.id]);

  const playPauseSegment = useCallback(async () => {
    if (isSegmentPlaying) {
      await TrackPlayer.pause();
    } else {
      await playFromSegment(segment, stream, isTrackPlayerPlaying);
    }
  }, [isSegmentPlaying, isTrackPlayerPlaying, segment, stream]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 bg-white dark:bg-black-0">
      <View className="flex flex-1 mx-6 my-4">
        {segment && (
          <View className="items-center space-y-4">
            <StreamCoverImage mobileSize="lg" stream={stream} />
            <Pressable onPress={() => navigation.navigate('Stream', { streamId: stream.id })}>
              <CenteredSmallText>{stream.name}</CenteredSmallText>
            </Pressable>
            <CenteredTitleText>{segment?.title}</CenteredTitleText>
            <View>
              <SegmentDateDurationDetails
                streamType={stream.stream_type}
                duration={Number(segment?.duration)}
                publishedAt={segment?.published_at}
                episodeNumber={segment?.number_in_series}
                textClassname="text-sm text-gray-2 dark:text-gray-4"
              />
            </View>
            <View className="flex flex-1 flex-row space-x-4 py-2">
              {hasAccess ? (
                <>
                  <View>
                    <Button
                      buttonStyle="Primary"
                      icon={isSegmentPlaying ? Icons.Pause : Icons.Play}
                      isOnlyIcon
                      svgHeight="24px"
                      svgWidth="24px"
                      title=""
                      buttonClassName="rounded-full justify-center items-center w-14 h-14"
                      onPress={playPauseSegment}
                    />
                  </View>
                  <View>
                    <Button
                      buttonStyle="Secondary"
                      icon={isFollowingStream ? Icons.Checkmark : Icons.Plus}
                      isOnlyIcon
                      isLoading={isChangingFollowStatus}
                      svgHeight="24px"
                      svgWidth="24px"
                      onPress={changeFollowStatus}
                      title={isFollowingStream ? 'Added' : 'Add to playlist'}
                      buttonClassName="rounded-full justify-center items-center w-14 h-14"
                    />
                  </View>
                </>
              ) : (
                <Button
                  buttonStyle="Primary"
                  icon={Icons.Lock}
                  isOnlyIcon={false}
                  isLoading={false}
                  title="Play"
                  onPress={async () => showSubsMessage({ variant: 'play', segmentId, streamId: stream?.id })}
                  buttonClassName="flex h-10 pr-4 pl-3 justify-center items-center"
                  svgHeight="16px"
                  svgWidth="16px"
                  titleClassName="ml-1.5 inline-block"
                />
              )}
            </View>
          </View>
        )}
        {segment && segment?.notes && (
          <View className="flex flex-1 flex-col mt-4">
            <TextH3>Episode Notes</TextH3>
            <View className="flex flex-row my-4 border-b border-b-gray-8 dark:border-b-gray-3/30" />
            <View className="flex flex-1">
              <SegmentNotes notes={segment.notes} />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
