import { PlaylistSegment } from '@jam/api-models';
import React from 'react';
import { useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../colors';
import { Checkmark } from '../icons';
import StreamCoverImage from '../StreamCoverImage';

type ListenSegmentCoverImageProps = {
  segment: Pick<PlaylistSegment, 'stream' | 'id'>;
  completed?: boolean;
  onSegmentClick: (segmentId: string) => void;
};

const CoverImageButton = styled.Pressable`
  display: flex;
  position: relative;
  vertical-align: top;
`;

const CheckMarkOuter = styled.View<{ isDarkMode: boolean }>`
  position: absolute;
  top: -6px;
  right: -6px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border-radius: 9999px;
  border-width: 2px;
  border-color: ${(props) => (props.isDarkMode ? colors.black[0] : colors.white)};
  background-color: ${(props) => (props.isDarkMode ? colors.dragonfruit[1] : colors.plum[1])};
`;

function ListenSegmentCoverImage({ segment, onSegmentClick, completed }: ListenSegmentCoverImageProps) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <CoverImageButton onPress={() => onSegmentClick(segment.id)}>
      <StreamCoverImage mobileSize="sm" stream={segment.stream} />
      {completed && (
        <CheckMarkOuter isDarkMode={isDarkMode} testID="CompletionCheckMark">
          <Checkmark
            height="10px"
            width="10px"
            svgStroke={isDarkMode ? colors.black[0] : colors.white}
            pathStroke={isDarkMode ? colors.black[0] : colors.white}
          />
        </CheckMarkOuter>
      )}
    </CoverImageButton>
  );
}
export default ListenSegmentCoverImage;
