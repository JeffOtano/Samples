import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import { PlaybackSpeed } from '../../src/types';
import SpeedToggle from '../../src/components/player/SpeedToggle';
import renderWithTheme from '../utils/renderWithTheme';

const mockHandleSpeedChange = jest.fn();
let mockSpeed = 1;
describe('SpeedToggle', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });
  it('Renders correctly', () => {
    renderWithTheme(<SpeedToggle onSpeedChange={mockHandleSpeedChange} speed={mockSpeed} />);
    const speedToggle = screen.getByTestId('SpeedToggle');

    expect(speedToggle).toBeTruthy();
  });

  it('Increases the speed to 1.2 when speed is 1 and button is pressed', async () => {
    renderWithTheme(<SpeedToggle onSpeedChange={mockHandleSpeedChange} speed={mockSpeed} />);
    const speedToggle = screen.getByTestId('SpeedToggle');

    await waitFor(async () => {
      fireEvent.press(speedToggle);
      expect(mockHandleSpeedChange).toHaveBeenCalledWith(PlaybackSpeed.OnePointTwo);
    });
  });

  it('Increases the speed to 1.5 when button is pressed and the current speed is 1.2', async () => {
    mockSpeed = 1.2;
    renderWithTheme(<SpeedToggle onSpeedChange={mockHandleSpeedChange} speed={mockSpeed} />);
    const speedToggle = screen.getByTestId('SpeedToggle');

    await waitFor(async () => {
      fireEvent.press(speedToggle);
      expect(mockHandleSpeedChange).toHaveBeenCalledWith(PlaybackSpeed.OnePointFive);
    });
  });

  it('Increases the speed to 2 when button is pressed and the current speed is 1.5', async () => {
    mockSpeed = 1.5;
    renderWithTheme(<SpeedToggle onSpeedChange={mockHandleSpeedChange} speed={mockSpeed} />);
    const speedToggle = screen.getByTestId('SpeedToggle');

    await waitFor(async () => {
      fireEvent.press(speedToggle);
      expect(mockHandleSpeedChange).toHaveBeenCalledWith(2);
    });
  });

  it('Goes back to speed 1 when button is pressed and the current speed is 2', async () => {
    mockSpeed = 2;
    renderWithTheme(<SpeedToggle onSpeedChange={mockHandleSpeedChange} speed={mockSpeed} />);
    const speedToggle = screen.getByTestId('SpeedToggle');

    await waitFor(async () => {
      fireEvent.press(speedToggle);
      expect(mockHandleSpeedChange).toHaveBeenCalledWith(1);
    });
  });
});
