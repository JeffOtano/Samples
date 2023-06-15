import { getShareUrl } from '@jam/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { View, Text, Pressable, Share } from 'react-native';
import { List, Erase, Mail, Share as ShareIcon } from '../../components/icons';
import removeFromPlaylist from '../../components/player/utils/removeFromPlaylist';
import { RootStackParamList, ThreeDotsMenuOptions } from '../../types';

type ThreeDotsMenuProps = NativeStackScreenProps<RootStackParamList, 'ThreeDotsMenu'>;

function ThreeDotsMenuScreen({ navigation, route }: ThreeDotsMenuProps) {
  const { segment } = route.params;

  const onSharePress = useCallback(() => {
    Share.share({
      title: 'Jam',
      message: getShareUrl(segment),
    });
  }, [segment]);

  const menuOptions: ThreeDotsMenuOptions[] = [
    {
      name: 'Share',
      action: onSharePress,
      icon: <ShareIcon height="24px" width="24px" />,
    },
    {
      name: 'View All Episodes',
      action: () => navigation.navigate('Stream', { streamId: segment.stream.id }),
      icon: <List height="24px" width="24px" />,
    },
    {
      name: 'Remove From Playlist',
      action: async () => removeFromPlaylist(segment.stream.id),
      icon: <Erase height="24px" width="24px" />,
    },
    {
      name: 'Message Creator',
      action: () => navigation.navigate('SendMessageScreenModal', { title: segment.title, segmentId: segment.id }),
      icon: <Mail height="24px" width="24px" />,
    },
  ];

  return (
    <View className="h-1/3 mt-auto rounded-t-xl bg-white dark:bg-black-0 w-full justify-center items-start">
      <View className=" w-16 bg-gray-2 h-1 align-middle my-4 rounded-sm mx-auto" />
      {menuOptions.map((option) => (
        <Pressable
          testID={option.name}
          key={option.name}
          onPress={option.action}
          className="flex-row items-center w-full h-12 px-4"
        >
          {option.icon}
          <Text className="text-black-1 text-base font-sans-bold dark:text-white ml-2">{option.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default ThreeDotsMenuScreen;
