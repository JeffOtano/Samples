import React, { useCallback } from 'react';
import { getShareUrl } from '@jam/utils';
import { PlaylistSegment } from '@jam/api-models';
import { Share } from 'react-native';
import ShareIcon from '../icons/Share';
import { InteractiveButtonOuter, InteractiveButtonText } from './StyledInteractiveButton';

type ShareButtonProps = {
  segment: Pick<PlaylistSegment, 'stream' | 'publishUri'>;
};

function ShareButton({ segment }: ShareButtonProps) {
  const onSharePress = useCallback(() => {
    Share.share({
      title: 'Jam',
      message: getShareUrl(segment),
    });
  }, [segment]);

  return (
    <InteractiveButtonOuter onPress={onSharePress}>
      <ShareIcon height="24px" width="24px" />
      <InteractiveButtonText>Share</InteractiveButtonText>
    </InteractiveButtonOuter>
  );
}

export default ShareButton;
