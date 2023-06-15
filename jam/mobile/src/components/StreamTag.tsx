import React from 'react';
import { Pressable, Text, View } from 'react-native';
import classNames from 'classnames';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

interface StreamTagProps {
  tag?: string; // need kebab case for tag lookup on backend
  text: string;
  tagClassName?: string;
}

function StreamTag({ tag, tagClassName, text }: StreamTagProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  let tagClass;
  let textClass;
  let hashtagPrefix = false;
  switch (text) {
    case 'Ads': {
      tagClass = 'bg-mango-2 text-mango-1 dark:opacity-80';
      textClass = 'font-sans-bold text-xxs text-mango-1';
      break;
    }
    case 'Paid': {
      tagClass = 'bg-blueberry-2 rounded-lg dark:opacity-50';
      textClass = 'font-sans-bold text-xxs text-blueberry-1';
      break;
    }
    default: {
      tagClass = 'bg-gray-8 dark:bg-gray-2 dark:opacity-80';
      textClass = 'text-gray-2 dark:text-white font-sans-bold text-xxs';
      hashtagPrefix = true;
    }
  }
  return (
    <View className={classNames('rounded-lg px-2 py-1 mr-1 mt-2 leading-compact', tagClass, tagClassName)}>
      <Pressable disabled={!navigation.navigate} onPress={() => navigation.navigate('StreamTag', { tag })}>
        <Text className={textClass}>
          {hashtagPrefix && '#'}
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

export default StreamTag;
