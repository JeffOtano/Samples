import { useAggregationStreamsInclude, useDiscoverGroups } from '@jam/api-client';
import { AggregationStreamInclude } from '@jam/prisma-shim';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Search from '../../../components/icons/Search';
import StreamCard from '../../../components/StreamCard';
import { DiscoverStackParamList } from '../../../types';

export const STREAM_COUNT_PER_DISCOVER_GROUP = 5;

type Props = NativeStackScreenProps<DiscoverStackParamList, 'DiscoverHome'>;
export default function DiscoverHomeScreen({ navigation }: Props) {
  const { data: userAggregationStreamsInclude } = useAggregationStreamsInclude();
  const { data: groups } = useDiscoverGroups(STREAM_COUNT_PER_DISCOVER_GROUP);
  const [myAggregationStreams, setMyAggregationStreams] = useState<string[]>([]);

  useEffect(() => {
    const streamIdMap = userAggregationStreamsInclude?.data?.map(
      (stream: AggregationStreamInclude) => stream.stream_id,
    );
    setMyAggregationStreams(() => streamIdMap);
  }, [userAggregationStreamsInclude]);

  return (
    <SafeAreaView className="flex flex-1 bg-white dark:bg-black-1 font-sans-normal">
      <ScrollView>
        <View className="p-6 justify-center items-center text-center">
          <View className="mb-0 flex flex-row justify-end w-full ">
            <Pressable
              onPress={() => {
                navigation.navigate('Search', { myAggregationStreams });
              }}
            >
              <Search height="24px" width="24px" />
            </Pressable>
          </View>
          {groups &&
            groups.length &&
            groups.map((group) => (
              <View key={group.category.label}>
                <Text className="dark:text-white text-2xl pb-2 font-sans-bold">{group.category.label}</Text>
                {group.streams.map((stream) => (
                  <StreamCard key={stream.name} myAggregationStreams={myAggregationStreams} stream={stream} />
                ))}
                <Pressable
                  onPress={() => {
                    navigation.navigate('Category', {
                      label: group.category.label,
                      myAggregationStreams,
                      publishUri: group.category.publishUri,
                    });
                  }}
                >
                  <Text className="m-auto mb-4 mt-2 text-plum-1 dark:text-dragonfruit-1 font-sans-bold">Show More</Text>
                </Pressable>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
