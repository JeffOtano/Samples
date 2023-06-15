import { Icons } from '@jam/web-icons';
import React from 'react';
import Button from '../Button';

type ListenHeaderPlaybackButtonProps = {
  onPlayPauseClick: () => void;
  isPlaying: boolean;
};

function ListenHeaderPlaybackButton({ onPlayPauseClick, isPlaying }: ListenHeaderPlaybackButtonProps) {
  return (
    <Button
      buttonClassName="w-24 h-12 items-center justify-center"
      buttonStyle="Primary"
      icon={isPlaying ? Icons.Pause : Icons.Play}
      titleClassName="ml-1 text-base"
      svgHeight="20px"
      svgWidth="20px"
      title={isPlaying ? 'Pause' : 'Play'}
      onPress={onPlayPauseClick}
    />
  );
}

export default ListenHeaderPlaybackButton;
