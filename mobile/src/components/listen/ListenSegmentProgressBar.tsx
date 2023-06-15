import React from 'react';
import { PlaylistSegment } from '@jam/api-models';
import { View, Text } from 'react-native';
import { useProgress } from 'react-native-track-player';
import { dayjs } from '@jam/utils';
import LinearGradient from 'react-native-linear-gradient';

type ListenSegmentProgressBarProps = {
  playlistSegment: PlaylistSegment;
};

function ListenSegmentProgressBar({ playlistSegment }: ListenSegmentProgressBarProps) {
  const progress = useProgress();
  const { position } = progress;

  return (
    <View className="flex-row ml-16 px-6 mt-3 align-middle items-center">
      <View className="h-1/2 w-4/5 bg-gray-6 dark:bg-gray-3/30 rounded-xl">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#6900bc', '#da01be']}
          style={{
            width: `${(position / playlistSegment.duration) * 100}%`,
            height: '100%',
          }}
        />
      </View>

      <Text className="text-right text-gray-3 font-sans-normal ml-4 text-xs dark:text-gray-4">
        - {dayjs.duration(playlistSegment.duration - position, 'seconds').format('m:ss')}
      </Text>
    </View>
  );
}
export default ListenSegmentProgressBar;
