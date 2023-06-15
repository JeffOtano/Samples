import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import TrackPlayer, { State } from 'react-native-track-player';
import styled from 'styled-components/native';
import colors from '../../../colors';
import useIsPlaying from '../../lib/hooks/useIsPlaying';
import { start } from '../../lib/utils/sonics';
import { Play, Pause } from '../icons/index';

const SvgOuter = styled(View)`
  position: absolute;
  top: 1.5em;
  right: 1.5em;
`;

type PlayerImageButtonProps = {
  imageURI: string;
};

function PlayerImageButton({ imageURI }: PlayerImageButtonProps) {
  const isPlaying = useIsPlaying();

  const onPlayerImagePress = useCallback(async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Paused || state === State.Stopped || state === State.None || state === State.Ready) {
      start.play(async () => {
        await TrackPlayer.play();
      });
    } else {
      await TrackPlayer.pause();
    }
  }, []);

  return (
    <Pressable testID="PlayerImageButton" onPress={onPlayerImagePress} className="h-16 w-16 rounded-l-2xl mr-4">
      <FastImage testID="PlayerImage" source={{ uri: imageURI }} className="w-full h-full rounded-l-2xl mr-4" />
      <View className="absolute bg-black-0 opacity-50 h-16 w-16 rounded-l-2xl" />
      {isPlaying ? (
        <SvgOuter className="absolute top-5 right-5">
          <Pause height="24px" width="24px" svgStroke={colors.white} svgFill={colors.white} />
        </SvgOuter>
      ) : (
        <SvgOuter className="absolute top-5 right-5">
          <Play height="24px" width="24px" svgStroke={colors.white} svgFill={colors.white} />
        </SvgOuter>
      )}
    </Pressable>
  );
}

export default PlayerImageButton;
