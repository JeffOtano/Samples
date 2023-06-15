import React from 'react';
import { Pressable, useColorScheme } from 'react-native';
import Markdown from 'react-native-easy-markdown';
import styled from 'styled-components/native';
import { notesMarkdownStyles } from '../segment/SegmentNotes';
import { TextH5 } from '../text';

type ListenSegmentNotesProps = {
  segmentId: string;
  segmentNotes?: string;
  visibleNotes: Set<string>;
  onToggleNote: (segmentId: string) => void;
};

const NotesOuter = styled.View`
  margin-top: 12px;
  margin-right: 24px;
  margin-left: 24px;
  padding-right: 24px;
  padding-left: 24px;
  border-width: 1px;
  border-radius: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-color: ${(props) => props.theme.border.secondary};
`;

const CloseText = styled(TextH5)`
  color: ${(props) => props.theme.text.paragraph};
  text-align: center;
`;

function ListenSegmentNotes({ segmentId, segmentNotes, visibleNotes, onToggleNote }: ListenSegmentNotesProps) {
  const colorScheme = useColorScheme();
  if (!segmentNotes || !visibleNotes.has(segmentId)) return null;

  return (
    <NotesOuter>
      <Markdown markdownStyles={notesMarkdownStyles({ colorScheme })}>{segmentNotes}</Markdown>
      <Pressable onPress={() => onToggleNote(segmentId)}>
        <CloseText>Close</CloseText>
      </Pressable>
    </NotesOuter>
  );
}
export default ListenSegmentNotes;
