import React, { useEffect, useState } from 'react';
import { useAggregationStreamsInclude, useStreams } from '@jam/api-client';
import { AggregationStreamInclude } from '@jam/prisma-shim';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, View } from 'react-native';
import StreamCard from '../../components/StreamCard';
import { RootStackParamList } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'StreamTag'>;
export default function StreamTagScreen({ route }: Props) {
  const { tag } = route.params;
  const { data: streams } = useStreams({ skipSubscribed: true, tag });
  const { data: userAggregationStreamsInclude } = useAggregationStreamsInclude();
  const [myAggregationStreams, setMyAggregationStreams] = useState<string[]>([]);

  useEffect(() => {
    const streamIdMap = userAggregationStreamsInclude?.data?.map(
      (stream: AggregationStreamInclude) => stream.stream_id,
    );

    setMyAggregationStreams(() => streamIdMap);
  }, [userAggregationStreamsInclude]);

  return (
    <SafeAreaView className="flex flex-1 bg-white dark:bg-black-1">
      <ScrollView>
        <View className="p-6 justify-center items-center text-center">
          {streams?.data.map((stream) => (
            <StreamCard key={stream.name} myAggregationStreams={myAggregationStreams} stream={stream} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
