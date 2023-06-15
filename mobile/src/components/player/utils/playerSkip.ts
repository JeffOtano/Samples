import TrackPlayer, { State } from 'react-native-track-player';
import { next } from '../../../lib/utils/sonics';
import { queueEmitter } from '../../../lib/utils/queueEmitter';
import { trackCurrentSegmentEvent } from '../../../lib/tracking';
import { JamTrack, TrackType } from '../../../types/player';

const waitForReadyPlayerState = async (playSonic?: boolean) => {
  let state: State;
  do {
    // eslint-disable-next-line no-await-in-loop
    state = await TrackPlayer.getState();
  } while (state !== State.Ready);

  if (state === State.Ready && playSonic) {
    next.play();
  }
};

async function playerSkip(playSonic?: boolean) {
  const currentTrackIndex = await TrackPlayer.getCurrentTrack();
  const position = await TrackPlayer.getPosition();
  const queue = (await TrackPlayer.getQueue()) as JamTrack[];
  const currentTrack = queue[currentTrackIndex];

  if (currentTrack.trackType === TrackType.Intro && currentTrackIndex + 2 < queue.length) {
    await TrackPlayer.skip(currentTrackIndex + 2);
  } else if (currentTrackIndex + 1 < queue.length) {
    await TrackPlayer.skipToNext();
  }

  if (
    currentTrackIndex === queue.length - 1 ||
    (currentTrack.trackType === TrackType.Intro && currentTrackIndex === queue.length - 2)
  ) {
    await TrackPlayer.pause();
  } else {
    await waitForReadyPlayerState(playSonic);
    await TrackPlayer.play();
  }

  queueEmitter.updated();
  await trackCurrentSegmentEvent('next', currentTrack.segment, position);
}

export default playerSkip;
