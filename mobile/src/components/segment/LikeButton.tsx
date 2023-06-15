import React, { useCallback, useRef, useState } from 'react';
import Like from '../icons/Like';
import updateLike from './util/updateLike';
import colors from '../../../colors';
import { InteractiveButtonOuter, InteractiveButtonText } from './StyledInteractiveButton';

interface LikeButtonProps {
  rating: string;
  segmentId: string;
}

function LikeButton({ rating, segmentId }: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isLiked = useRef(rating === 'true');

  const changeLikePreference = useCallback(async () => {
    setIsLoading(true);
    isLiked.current = !isLiked.current;
    const success = await updateLike(segmentId, String(isLiked.current));
    if (!success) {
      isLiked.current = !isLiked.current;
    }
    setIsLoading(false);
  }, [segmentId]);

  return (
    <InteractiveButtonOuter disabled={isLoading} onPress={changeLikePreference}>
      <Like
        height="24px"
        width="24px"
        svgFill={isLiked.current ? colors.dragonfruit[1] : colors.transparent}
        svgStroke={isLiked.current && colors.dragonfruit[1]}
        pathFill={isLiked.current ? colors.dragonfruit[1] : colors.transparent}
        pathStroke={isLiked.current && colors.dragonfruit[1]}
      />
      <InteractiveButtonText>Like</InteractiveButtonText>
    </InteractiveButtonOuter>
  );
}

export default LikeButton;
