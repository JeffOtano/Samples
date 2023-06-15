import { PlaylistSegment } from '@jam/api-models';
import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../colors';
import { TextH4, TextH5, TextP2 } from '../text';

type ListenSegmentTitleAreaProps = {
  segment: Pick<PlaylistSegment, 'id' | 'title' | 'stream' | 'notes'>;
  onSegmentClick: (segmentId: string) => void;
  onToggleNote?: (segmentId: string) => void;
};

const TitleAreaOuter = styled.View`
  display: flex;
  margin-left: 24px;
  margin-right: 24px;
  flex: 1;
`;

const TitleAreaInner = styled.View`
  display: flex;
  flex-direction: row;
`;

const SegmentTitleButton = styled.Pressable`
  display: flex;
  vertical-align: middle;
  margin-bottom: 4px;
  margin-right: 4px;
`;

const StreamTitleButton = styled.Pressable`
  display: flex;
  flex-shrink: 1;
  align-content: flex-start;
  align-items: flex-start;
  vertical-align: middle;
`;

const NotesText = styled(TextH5)<{ isDarkMode: boolean }>`
  color: ${(props) => (props.isDarkMode ? colors.dragonfruit[1] : colors.plum[1])};
`;

const NotesArea = styled.View`
  flex-direction: row;
  flex-grow: 1;
  align-items: flex-end;
`;

function ListenSegmentTitleArea({ segment, onSegmentClick, onToggleNote }: ListenSegmentTitleAreaProps) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TitleAreaOuter>
      <SegmentTitleButton onPress={() => onSegmentClick(segment.id)}>
        <TextH4 numberOfLines={2}>{segment.title}</TextH4>
      </SegmentTitleButton>
      <TitleAreaInner>
        <StreamTitleButton onPress={() => onSegmentClick(segment.id)}>
          <TextP2 numberOfLines={3}>{segment.stream.name}</TextP2>
        </StreamTitleButton>

        {segment.notes && (
          <NotesArea>
            <TextP2> &middot; </TextP2>
            <Pressable onPress={() => onToggleNote(segment.id)}>
              <NotesText isDarkMode={isDarkMode}>Notes</NotesText>
            </Pressable>
          </NotesArea>
        )}
      </TitleAreaInner>
    </TitleAreaOuter>
  );
}
export default ListenSegmentTitleArea;
