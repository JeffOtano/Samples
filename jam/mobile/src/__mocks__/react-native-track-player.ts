import { mockDeep } from 'jest-mock-extended';

const TrackPlayer = mockDeep();

const State = {
  Paused: 'paused',
  Playing: 'playing',
};

const Event = { PlaybackState: 'playback-state' };

export { State, Event };

export default TrackPlayer;
