import React, { useState } from 'react';
import { useStreamSearch } from '@jam/api-client';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import StreamCard from '../../../components/StreamCard';
import Search from '../../../components/icons/Search';
import { DiscoverStackParamList } from '../../../types';

const SEARCH_QUERY_MIN_LENGTH = 2;
const STREAM_SEARCH_LIMIT = 5;

const SearchIconOuter = styled(View)`
  margin-left: 8px;
  margin-right: 8px;
`;

type Props = NativeStackScreenProps<DiscoverStackParamList, 'Search'>;
export default function SearchScreen({ route }: Props) {
  const { myAggregationStreams } = route.params;
  const [query, setQuery] = useState('');
  const { data: streams } = useStreamSearch(query.length > SEARCH_QUERY_MIN_LENGTH ? query : null, STREAM_SEARCH_LIMIT);

  return (
    <SafeAreaView className="flex flex-1 bg-white dark:bg-black-1">
      <ScrollView>
        <View className="p-6 justify-center items-center text-center">
          <View className="flex flex-row justify-center items-center rounded-3xl shadow-1 p-2 mx-2 mb-6 w-full bg-gray-6 dark:bg-gray-2">
            <SearchIconOuter>
              <Search height="24px" width="24px" />
            </SearchIconOuter>

            <TextInput
              className="flex flex-1 font-sans-normal text-black-0 dark:text-white placeholder:text-black-0 dark:placeholder:text-white "
              onChangeText={setQuery}
              placeholder="Search"
              value={query}
            />
          </View>
          {streams?.data && !streams?.data.length && (
            <Text className="font-sans-normal text-lg text-gray-3 dark:text-white mt-6">No results found</Text>
          )}
          {streams?.data.map((stream) => (
            <StreamCard key={stream.name} myAggregationStreams={myAggregationStreams} stream={stream} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
