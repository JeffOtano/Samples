import React from 'react';
import { Pressable } from 'react-native';
import { PlaybackSpeed } from '../../types';
import { Speed1x, Speed1point2x, Speed1point5x, Speed2x } from '../icons/index';

export const SPEED_STORAGE_KEY = 'speed';

const SpeedIcons = {
  1: <Speed1x height="24px" width="24px" />,
  1.2: <Speed1point2x height="24px" width="24px" />,
  1.5: <Speed1point5x height="24px" width="24px" />,
  2: <Speed2x height="24px" width="24px" />,
};

const ALL_SPEEDS: Array<PlaybackSpeed> = [
  PlaybackSpeed.One,
  PlaybackSpeed.OnePointTwo,
  PlaybackSpeed.OnePointFive,
  PlaybackSpeed.Two,
];

type SpeedToggleProps = {
  onSpeedChange: (speed: PlaybackSpeed) => void;
  speed: PlaybackSpeed;
  supportedSpeeds?: PlaybackSpeed[];
};

const nextSpeed = (supportedSpeeds: Array<PlaybackSpeed>, currentSpeed: PlaybackSpeed): PlaybackSpeed => {
  const idx = supportedSpeeds.indexOf(currentSpeed);
  const nextIdx = (idx + 1) % supportedSpeeds.length;
  return supportedSpeeds[nextIdx];
};

function SpeedToggle({ onSpeedChange, speed, supportedSpeeds = ALL_SPEEDS }: SpeedToggleProps) {
  return (
    <Pressable testID="SpeedToggle" onPress={() => onSpeedChange(nextSpeed(supportedSpeeds, speed))}>
      {SpeedIcons[speed]}
    </Pressable>
  );
}

export default SpeedToggle;
