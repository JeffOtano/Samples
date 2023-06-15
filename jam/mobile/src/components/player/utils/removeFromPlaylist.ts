import { deleteAggregationStreamIncludes } from '@jam/api-client';
import TrackPlayer from 'react-native-track-player';
import { JamTrack } from '../../../types/player';
import toast from '../../../lib/utils/toast';
import { queueEmitter } from '../../../lib/utils/queueEmitter';

async function removeFromPlaylist(streamId: string) {
  try {
    await deleteAggregationStreamIncludes(streamId);
    const queue = (await TrackPlayer.getQueue()) as JamTrack[];
    const tracksToRemove = [];
    queue.forEach((track, index) => {
      if (track.segment.stream.id === streamId) {
        tracksToRemove.push(index);
      }
    });

    await TrackPlayer.remove(tracksToRemove);
    queueEmitter.updated();
  } catch (e) {
    console.error(e);
    toast.danger(`It's us not you, please try again later`);
  }
}

export default removeFromPlaylist;
