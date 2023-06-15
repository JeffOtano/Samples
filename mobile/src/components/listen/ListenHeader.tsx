import React from 'react';
import { View, Text } from 'react-native';
import ListenHeaderPlaybackButton from './ListenHeaderPlaybackButton';

type ListenHeaderProps = {
  onPlayPauseClick: () => void;
  isPlaying: boolean;
};

function ListenHeader({ onPlayPauseClick, isPlaying }: ListenHeaderProps) {
  return (
    <View className="flex flex-row items-center mx-6 mt-4 justify-between border-b border-b-gray-7 pb-4 dark:border-b-gray-3/30">
      <Text className="text-2xl leading-6 dark:text-white font-sans-bold">Next Up</Text>
      <ListenHeaderPlaybackButton onPlayPauseClick={onPlayPauseClick} isPlaying={isPlaying} />
    </View>
  );
}

export default ListenHeader;
