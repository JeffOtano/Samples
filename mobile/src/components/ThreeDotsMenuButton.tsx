import { PlaylistSegment } from '@jam/api-models';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { ListenStackParamList } from '../types';
import { ThreeDots } from './icons';

type ThreeDotsMenuButtonProps = {
  segment: Pick<PlaylistSegment, 'stream' | 'publishUri' | 'id' | 'title'>;
};

function ThreeDotsMenuButton({ segment }: ThreeDotsMenuButtonProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ListenStackParamList>>();

  const onThreeDotsPress = useCallback(() => {
    navigation.push('ThreeDotsMenu', { segment });
  }, [navigation, segment]);

  return (
    <View className="flex flex-row-reverse h-6">
      <Pressable onPress={onThreeDotsPress} className="mr-6">
        <ThreeDots height="24px" width="24px" />
      </Pressable>
    </View>
  );
}

export default ThreeDotsMenuButton;
