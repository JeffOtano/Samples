import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import PlayerSkipBackwards10 from '../../src/components/player/PlayerSkipBackwards10';
import renderWithTheme from '../utils/renderWithTheme';

const mockSkipBackwards = jest.fn();

describe('PlayerSkipForward', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('Renders correctly', () => {
    renderWithTheme(<PlayerSkipBackwards10 onSkipBackwards={mockSkipBackwards} />);
    const skipBackwardsButton = screen.getByTestId('SkipBackwards10Button');

    expect(skipBackwardsButton).toBeTruthy();
  });
  it('Calls seekTo with the current position minus 10 seconds', async () => {
    renderWithTheme(<PlayerSkipBackwards10 onSkipBackwards={mockSkipBackwards} />);
    const skipBackwardsButton = screen.getByTestId('SkipBackwards10Button');
    fireEvent.press(skipBackwardsButton);

    await waitFor(() => {
      expect(mockSkipBackwards).toHaveBeenCalledWith(10);
    });
  });
});
