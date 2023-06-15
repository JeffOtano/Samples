import TrackPlayer from 'react-native-track-player';
import playFromSegment from '../../../../src/navigation/standalone/util/playFromSegment';
import SEGMENT from '../../../fixtures/segments';
import STREAM from '../../../fixtures/streams';

const mockGetQueue = TrackPlayer.getQueue as jest.Mock;
const mockGetCurrentTrack = TrackPlayer.getCurrentTrack as jest.Mock;

describe('playFromSegment', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('Adds the current segment to the queue if it does not exist', async () => {
    mockGetQueue.mockResolvedValueOnce([]);
    await playFromSegment(SEGMENT, STREAM, false);
    expect(TrackPlayer.add).toHaveBeenCalled();
  });
  it('Skips to the track if found in the queue', async () => {
    mockGetQueue.mockResolvedValueOnce([{ segment: { id: '2' } }, { segment: SEGMENT, trackType: 'segment' }]);
    mockGetCurrentTrack.mockResolvedValueOnce(0);
    await playFromSegment(SEGMENT, STREAM, false);
    expect(TrackPlayer.skip).toHaveBeenCalled();
  });
  it('Plays the track and does not skip or add if the current track is equal to the segment track', async () => {
    mockGetQueue.mockResolvedValueOnce([{ segment: { id: '2' } }, { segment: SEGMENT, trackType: 'segment' }]);
    mockGetCurrentTrack.mockResolvedValueOnce(1);
    await playFromSegment(SEGMENT, STREAM, false);
    expect(TrackPlayer.play).toHaveBeenCalled();
    expect(TrackPlayer.skip).not.toHaveBeenCalled();
    expect(TrackPlayer.add).not.toHaveBeenCalled();
  });
  it('Does not call play if the player is already playing', async () => {
    mockGetQueue.mockResolvedValueOnce([{ segment: { id: '2' } }, { segment: SEGMENT, trackType: 'segment' }]);
    mockGetCurrentTrack.mockResolvedValueOnce(1);
    await playFromSegment(SEGMENT, STREAM, true);
    expect(TrackPlayer.play).not.toHaveBeenCalled();
  });
});
