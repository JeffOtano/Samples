import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import TrackPlayer, { State } from 'react-native-track-player';
import PlayerImageButton from '../../src/components/player/PlayerImageButton';

const getStateMock = TrackPlayer.getState as jest.Mock;
const mockImageURI = 'https://www.example.com/image.png';

describe('PlayerImageButton', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('Renders correctly', () => {
    const { getByTestId } = render(<PlayerImageButton imageURI={mockImageURI} />);
    const playerImageButton = getByTestId('PlayerImageButton');
    const playerImage = getByTestId('PlayerImage');

    expect(playerImageButton).toBeTruthy();
    expect(playerImage.props.source.uri).toBe(mockImageURI);
  });
  it('Calls TrackPlayer.play() when the player is paused and the button is pressed', async () => {
    getStateMock.mockResolvedValue(State.Ready);
    render(<PlayerImageButton imageURI={mockImageURI} />);
    const playerImageButton = screen.getByTestId('PlayerImageButton');

    await waitFor(async () => {
      fireEvent.press(playerImageButton);
      expect(TrackPlayer.play).toHaveBeenCalledTimes(1);
    });
  });
  it('Calls TrackPlayer.pause() when the player is playing and the button is pressed', async () => {
    getStateMock.mockResolvedValue(State.Playing);
    const { getByTestId } = render(<PlayerImageButton imageURI={mockImageURI} />);
    const playerImageButton = getByTestId('PlayerImageButton');

    await waitFor(async () => {
      fireEvent.press(playerImageButton);
      expect(TrackPlayer.pause).toHaveBeenCalledTimes(1);
    });
  });
  it('It should not call play when state is mocked as playing', async () => {
    getStateMock.mockResolvedValue(State.Playing);
    const { getByTestId } = render(<PlayerImageButton imageURI={mockImageURI} />);
    const playerImageButton = getByTestId('PlayerImageButton');

    await waitFor(async () => {
      fireEvent.press(playerImageButton);
      expect(TrackPlayer.play).not.toHaveBeenCalled();
    });
  });
});
