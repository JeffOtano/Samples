import React from 'react';
import { Pressable } from 'react-native';
import SkipBackwards10 from '../icons/SkipBackwards10';

const TEN_SECONDS = 10;
type PlayerSkipBackwards10Props = {
  onSkipBackwards: (seconds: number) => void;
};

function PlayerSkipBackwards10({ onSkipBackwards }: PlayerSkipBackwards10Props) {
  return (
    <Pressable testID="SkipBackwards10Button" onPress={() => onSkipBackwards(TEN_SECONDS)}>
      <SkipBackwards10 height="24px" width="24px" />
    </Pressable>
  );
}

export default PlayerSkipBackwards10;
