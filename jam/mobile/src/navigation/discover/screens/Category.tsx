import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStreams } from '@jam/api-client';
import StreamCard from '../../../components/StreamCard';
import { DiscoverStackParamList } from '../../../types';

type CategoryProps = NativeStackScreenProps<DiscoverStackParamList, 'Category'>;

export default function CategoryScreen({ route }: CategoryProps) {
  const { label, myAggregationStreams, publishUri } = route.params;
  const { data: streams } = useStreams({ streamGroupPublishUri: publishUri });
  return (
    <SafeAreaView className="flex flex-1 bg-white dark:bg-black-1">
      <ScrollView className="p-6">
        <Text className="text-2xl font-sans-bold text-black-0 dark:text-white mb-2 mt-4">{label}</Text>
        {streams?.data.map((stream) => (
          <StreamCard key={stream.name} myAggregationStreams={myAggregationStreams} stream={stream} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
