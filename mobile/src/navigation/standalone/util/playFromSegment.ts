import { Segment, Stream } from '@jam/prisma-shim';
import TrackPlayer from 'react-native-track-player';
import { start } from '../../../lib/utils/sonics';
import { segmentToTrack } from '../../../components/player/utils/segmentToTrack';

async function playFromSegment(segment: Segment, stream: Stream, isTrackPlayerPlaying: boolean) {
  let trackIndex: number | void = -1;
  const queue = await TrackPlayer.getQueue();
  const currentTrackIndex = await TrackPlayer.getCurrentTrack();
  trackIndex = queue.findIndex((track) => track.segment.id === segment.id && track.trackType === 'segment');

  if (trackIndex === -1) {
    const segmentTrack = segmentToTrack(segment, stream);
    trackIndex = await TrackPlayer.add(segmentTrack, currentTrackIndex + 1);
  }

  if (typeof trackIndex === 'number' && trackIndex !== currentTrackIndex) {
    await TrackPlayer.skip(trackIndex);
  }

  start.play(async () => {
    if (!isTrackPlayerPlaying) {
      await TrackPlayer.play();
    }
  });
}

export default playFromSegment;
