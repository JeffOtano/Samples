import React from 'react';
import styled from 'styled-components/native';
import { PlaylistSegment } from '@jam/api-models';
import { View } from 'react-native';
import LikeButton from './LikeButton';
import MessageButton from './MessageButton';
import ShareButton from './ShareButton';

interface InteractiveBarProps {
  segment: Pick<PlaylistSegment, 'rating' | 'id' | 'stream' | 'publishUri' | 'title'>;
}

const InteractiveBarOuter = styled(View)`
  flex-direction: row;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 12px;
  justify-content: center;
`;

function InteractiveBar({ segment }: InteractiveBarProps) {
  return (
    <InteractiveBarOuter>
      <LikeButton rating={segment.rating} segmentId={segment.id} />
      {segment.stream.message_creator_enabled && <MessageButton segmentId={segment.id} title={segment.title} />}
      <ShareButton segment={segment} />
    </InteractiveBarOuter>
  );
}

export default InteractiveBar;
