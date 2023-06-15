import { Icons } from '@jam/web-icons';
import React from 'react';
import styled from 'styled-components/native';
import Button from '../Button';

const PlaylistHistoryButtonOuter = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface PlaylistHistoryButtonProps {
  onShowHistory: () => void;
}

function PlaylistHistoryButton({ onShowHistory }: PlaylistHistoryButtonProps) {
  return (
    <PlaylistHistoryButtonOuter>
      <Button
        buttonStyle="Secondary"
        title="Listening history"
        buttonClassName="h-8 w-32 rounded-2xl sm:h-8 sm:w-40"
        titleClassName="ml-1 text-xs"
        icon={Icons.CaretUp}
        svgHeight="16px"
        svgWidth="16px"
        onPress={onShowHistory}
      />
    </PlaylistHistoryButtonOuter>
  );
}

export default PlaylistHistoryButton;
