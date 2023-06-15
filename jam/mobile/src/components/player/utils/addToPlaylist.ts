import { putAggregationStreamIncludes } from '@jam/api-client';
import TrackPlayer from 'react-native-track-player';
import { JamTrack } from '../../../types/player';
import toast from '../../../lib/utils/toast';
import { queueEmitter } from '../../../lib/utils/queueEmitter';

export async function addStreamToPlaylist(streamId: string) {
  try {
    await putAggregationStreamIncludes(streamId);
    queueEmitter.updated();
  } catch (e) {
    console.error(e);
    toast.danger(`It's us not you, please try again later`);
  }
}

export async function addTracksToQueue(tracks: JamTrack[]) {
  const queue = (await TrackPlayer.getQueue()) as JamTrack[];
  const tracksToAdd = tracks.filter(
    (track) => !queue.find((trackInQueue) => trackInQueue.segment.id === track.segment.id),
  );
  await TrackPlayer.add(tracksToAdd);
  queueEmitter.updated();
}
