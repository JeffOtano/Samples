/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AggregationStreamInclude, Stream } from '@jam/prisma-shim';
import { sortStreamsWithoutArticles } from '@jam/utils';
import { useAggregationStreamsInclude, useStreams } from '@jam/api-client';

import StreamCard from '../../../components/StreamCard';

export default function EditPlaylistScreen() {
  const { data: streams } = useStreams();
  const { data: userAggregationStreamsInclude } = useAggregationStreamsInclude();
  const [myAggregationStreams, setMyAggregationStreams] = useState<string[]>([]);
  const [streamsToShow, setStreamsToShow] = useState<Stream[]>([]);
  const [initialStreamIds, setInitialStreamsIds] = useState<string[]>([]);
  const [uiStreamsAreLocked, setUiStreamsAreLocked] = useState(false);
  useEffect(() => {
    const streamIdMap = userAggregationStreamsInclude?.data?.map(
      (stream: AggregationStreamInclude) => stream.stream_id,
    );

    setMyAggregationStreams(() => streamIdMap);

    if (!uiStreamsAreLocked) {
      setInitialStreamsIds(streamIdMap);
    }
  }, [userAggregationStreamsInclude, uiStreamsAreLocked]);

  useEffect(() => {
    const streamsWeWillShow: Stream[] = [];
    if (initialStreamIds && initialStreamIds.length > 0 && streams && Array.isArray(streams.data)) {
      for (let i = 0; i < initialStreamIds.length; i += 1) {
        const streamToAdd: Stream | undefined = streams.data.find((str) => str.id === initialStreamIds[i]);
        if (streamToAdd) {
          streamsWeWillShow.push(streamToAdd);
        }
      }
    }
    if (streamsWeWillShow.length > 0) {
      const sortedStreams: Stream[] = sortStreamsWithoutArticles(streamsWeWillShow);
      setStreamsToShow(sortedStreams);
    }
  }, [streams, uiStreamsAreLocked, initialStreamIds]);

  const allStreams = streamsToShow?.map((stream) => (
    <StreamCard
      key={stream.id}
      stream={stream}
      myAggregationStreams={myAggregationStreams}
      onFollowChange={() => setUiStreamsAreLocked(true)}
    />
  ));
  return (
    <ScrollView className="bg-white dark:bg-black-0">
      <View className="mx-6">{allStreams}</View>
    </ScrollView>
  );
}
