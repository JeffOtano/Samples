import { putSegmentRating } from '@jam/api-client';
import { mutate } from 'swr';
import toast from '../../../lib/utils/toast';

const FIVE_SECONDS = 5000;

const updateLike = async (segmentId: string, rating: string): Promise<boolean> => {
  try {
    await putSegmentRating(segmentId, rating);
    await mutate(`/api/segments/${segmentId}/rating`);
    return true;
  } catch (error) {
    toast.danger({
      message: `We had an issue updating your rating. Please try again`,
      durationOverride: FIVE_SECONDS,
    });
    console.error(error);
    return false;
  }
};

export default updateLike;
