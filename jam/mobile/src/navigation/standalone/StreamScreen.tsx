import React, { useCallback, useEffect, useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Icons } from '@jam/web-icons';

import { useSegmentsByPublishUri, useStreamById, useAggregationStreamsInclude } from '@jam/api-client';
import { Segment } from '@jam/prisma-shim';
import { fractionMinute, prettyUrl } from '@jam/utils';

import styled from 'styled-components/native';
import { useSWRNativeRevalidate } from '@nandorojo/swr-react-native';
import StreamTag from '../../components/StreamTag';
import Button from '../../components/Button';

import { RootStackParamList } from '../../types/navigation';
import SegmentCard from '../../components/segment/SegmentCard';
import { FOCUS_INTERVAL_THROTTLE } from '../../lib/swr';
import StreamCoverImage from '../../components/StreamCoverImage';
import { TextH1, TextH3, TextLink2, TextP2 } from '../../components/text';
import showSubsMessage from '../../lib/utils/subs-message';
import removeFromPlaylist from '../../components/player/utils/removeFromPlaylist';
import { addStreamToPlaylist } from '../../components/player/utils/addToPlaylist';

const SEGMENT_LIST_LIMIT = 50;

type StreamProps = NativeStackScreenProps<RootStackParamList, 'Stream'>;

const TextP2Capitalized = styled(TextP2)`
  text-transform: capitalize;
`;

const TextP2Padded = styled(TextP2)`
  padding: 0 8px;
`;

export default function StreamScreen({ navigation, route }: StreamProps) {
  const { streamId } = route.params;
  const [isFollowingStream, setIsFollowingStream] = useState(false);
  const [isChangingFollowStatus, setIsChangingFollowStatus] = useState(false);

  const { data: stream } = useStreamById(streamId);
  const { data: segments } = useSegmentsByPublishUri(stream?.publish_uri, SEGMENT_LIST_LIMIT); // No pagination yet. TODO;

  const { data: userAggregationStreamsInclude, mutate: mutateUseAggregationStreamsInclude } =
    useAggregationStreamsInclude();
  useSWRNativeRevalidate({
    mutate: mutateUseAggregationStreamsInclude,
    focusThrottleInterval: FOCUS_INTERVAL_THROTTLE,
  });

  useEffect(() => {
    if (stream && userAggregationStreamsInclude) {
      const aggregationStreamInclude = userAggregationStreamsInclude.data.find((aSI) => aSI.stream?.id === stream.id);
      setIsFollowingStream(!!aggregationStreamInclude);
    }
  }, [userAggregationStreamsInclude, stream]);

  const isPaidStream = stream?.StripePrice?.length;

  const changeFollowStatus = useCallback(async () => {
    setIsChangingFollowStatus(true);
    if (isFollowingStream && !isPaidStream) {
      await removeFromPlaylist(streamId);
      setIsFollowingStream(false);
    } else if (isFollowingStream && isPaidStream) {
      await showSubsMessage({ variant: 'unfollow', streamId });
    } else if (isPaidStream) {
      await showSubsMessage({ variant: 'follow', streamId });
    } else {
      await addStreamToPlaylist(streamId);
      setIsFollowingStream(true);
    }
    setIsChangingFollowStatus(false);
  }, [isFollowingStream, isPaidStream, streamId]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex flex-1 bg-white dark:bg-black-0">
      <View className="flex flex-1 mx-6 my-4">
        <StreamCoverImage stream={stream} mobileSize="xl" />
        <View className="my-6">
          <TextH1>{stream?.name} </TextH1>
        </View>
        <View className="flex flex-row mb-6">
          <TextP2Capitalized>{stream?.frequency}</TextP2Capitalized>
          <TextP2Padded>&middot;</TextP2Padded>
          <TextP2 className="font-sans-normal text-gray-2 dark:text-gray-4">
            {fractionMinute(parseInt(stream?.avg_duration, 10))}
          </TextP2>
        </View>
        {stream?.tags && stream?.tags.length > 0 && (
          <View className="flex flex-row mb-2">
            {stream?.tags?.map((tag: string) => (
              <StreamTag key={tag} text={tag} tagClassName="mr-4 mb-4" />
            ))}
          </View>
        )}
        <View className="mb-6">
          <TextP2 className="font-sans-normal leading-compact text-gray-2 dark:text-gray-4">
            {stream?.description}
          </TextP2>
          {stream?.link_in_bio && (
            <Pressable
              className="flex-row mb-6"
              onPress={() => {
                navigation.navigate('Webview', { uri: stream?.link_in_bio });
              }}
            >
              <TextLink2 className="font-sans-bold text-plum-1 dark:text-dragonfruit-1">
                {prettyUrl(stream?.link_in_bio)}
              </TextLink2>
            </Pressable>
          )}
        </View>

        <Button
          buttonStyle={isFollowingStream ? 'Secondary' : 'Primary'}
          icon={isFollowingStream ? Icons.Checkmark : Icons.Plus}
          isOnlyIcon={false}
          isLoading={isChangingFollowStatus}
          title={isFollowingStream ? 'Added' : 'Add to playlist'}
          onPress={changeFollowStatus}
          buttonClassName="flex h-10 pr-4 pl-3 justify-center items-center"
          svgHeight="16px"
          svgWidth="16px"
          titleClassName="ml-1.5 inline-block"
        />
        <View className="divide-y divide-gray-7 flex self-stretch mt-10">
          <TextH3>Episodes ({segments?.totalCount})</TextH3>
          <View className="flex flex-row my-4 border-b border-b-gray-8 dark:border-b-gray-3/30" />
        </View>
        <View className="flex flex-1 flex-col">
          {segments?.data?.map((segment: Segment) => (
            <View className="flex flex-1 my-4" key={segment.id}>
              <Pressable
                className="flex-row"
                onPress={() => {
                  navigation.navigate('Segment', { segmentId: segment.id, stream });
                }}
              >
                <SegmentCard stream={stream} segment={segment} />
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
