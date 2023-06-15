import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import colors from '../../../colors';
import SkipForward from '../icons/SkipForward';
import playerSkip from './utils/playerSkip';

function PlayerSkipForward() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Pressable testID="SkipForwardButton" onPress={async () => playerSkip()}>
      <SkipForward height="24px" width="24px" pathFill={isDarkMode ? colors.white : colors.black[0]} />
    </Pressable>
  );
}

export default PlayerSkipForward;
