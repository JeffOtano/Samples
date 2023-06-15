import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import TrackPlayer from 'react-native-track-player';
import { TrackType } from '../../src/types/player';
import PlayerSkipForward from '../../src/components/player/PlayerSkipForward';
import renderWithTheme from '../utils/renderWithTheme';

const mockGetQueue = TrackPlayer.getQueue as jest.Mock;
const mockGetCurrentTrack = TrackPlayer.getCurrentTrack as jest.Mock;

describe('PlayerSkipForward', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('Renders correctly', () => {
    const { getByTestId } = renderWithTheme(<PlayerSkipForward />);
    const skipForwardButton = getByTestId('SkipForwardButton');

    expect(skipForwardButton).toBeTruthy();
  });
  it('Calls track player skip to next when pressed', async () => {
    const { getByTestId } = renderWithTheme(<PlayerSkipForward />);
    const skipForwardButton = getByTestId('SkipForwardButton');

    mockGetCurrentTrack.mockResolvedValue(0);
    mockGetQueue.mockReturnValueOnce([{ id: '1' }, { id: '2' }]);
    fireEvent.press(skipForwardButton);

    await waitFor(() => {
      expect(TrackPlayer.skipToNext).toHaveBeenCalled();
    });
  });

  it('Does not call track player skip to next when pressed if there is no next track', async () => {
    const { getByTestId } = renderWithTheme(<PlayerSkipForward />);
    const skipForwardButton = getByTestId('SkipForwardButton');
    mockGetCurrentTrack.mockResolvedValue(1);
    mockGetQueue.mockReturnValueOnce([{ id: '1' }, { id: '2' }]);
    fireEvent.press(skipForwardButton);

    await waitFor(() => {
      expect(TrackPlayer.skipToNext).not.toHaveBeenCalled();
    });
  });

  it('Should skip to the next segment if currently playing an intro', async () => {
    renderWithTheme(<PlayerSkipForward />);
    const skipForwardButton = screen.getByTestId('SkipForwardButton');

    await waitFor(() => {
      mockGetCurrentTrack.mockResolvedValue(0);
      mockGetQueue.mockReturnValueOnce([
        { id: '1', trackType: TrackType.Intro },
        { id: '2', trackType: TrackType.Segment },
        { id: '3', trackType: TrackType.Intro },
        { id: '4', trackType: TrackType.Segment },
      ]);
      fireEvent.press(skipForwardButton);
      expect(TrackPlayer.skip).toHaveBeenCalledWith(2);
    });
  });

  it('Should pause playback if the current index is the last in the queue', async () => {
    renderWithTheme(<PlayerSkipForward />);
    const skipForwardButton = screen.getByTestId('SkipForwardButton');

    await waitFor(() => {
      mockGetCurrentTrack.mockResolvedValue(0);
      mockGetQueue.mockReturnValueOnce([{ id: '1', trackType: TrackType.Segment }]);
      fireEvent.press(skipForwardButton);
      expect(TrackPlayer.pause).toHaveBeenCalled();
    });
  });

  it('Should pause playback if the current index is the intro for the last segment in the queue', async () => {
    renderWithTheme(<PlayerSkipForward />);
    const skipForwardButton = screen.getByTestId('SkipForwardButton');

    await waitFor(() => {
      mockGetCurrentTrack.mockResolvedValue(0);
      mockGetQueue.mockReturnValueOnce([
        { id: '1', trackType: TrackType.Intro },
        { id: '2', trackType: TrackType.Segment },
      ]);
      fireEvent.press(skipForwardButton);
      expect(TrackPlayer.pause).toHaveBeenCalled();
    });
  });
});
