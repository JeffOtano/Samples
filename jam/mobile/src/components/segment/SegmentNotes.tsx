import React from 'react';
import MarkdownComponent from 'react-native-easy-markdown';
import { useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../colors';

type SegmentNotesProps = {
  notes: string;
};

const DARK_COLOR_SCHEME = 'dark';

const SegmentNotesOuter = styled.View`
  display: flex;
  flex: 1 1 0%;
  flex-direction: row;
`;

const Markdown = styled(MarkdownComponent)`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  flex-grow: 1;
`;

export function notesMarkdownStyles({ colorScheme }) {
  return colorScheme === DARK_COLOR_SCHEME
    ? {
        text: { color: colors.gray[4], fontFamily: 'Lato-Regular' },
        link: { color: colors.dragonfruit[1], fontFamily: 'Lato-Bold' },
      }
    : {
        text: { color: colors.gray[2], fontFamily: 'Lato-Regular' },
        link: { color: colors.plum[1], fontFamily: 'Lato-Bold' },
      };
}

function SegmentNotes({ notes }: SegmentNotesProps) {
  const colorScheme = useColorScheme();

  return (
    <SegmentNotesOuter>
      <Markdown markdownStyles={notesMarkdownStyles({ colorScheme })}>{notes}</Markdown>
    </SegmentNotesOuter>
  );
}

export default SegmentNotes;
