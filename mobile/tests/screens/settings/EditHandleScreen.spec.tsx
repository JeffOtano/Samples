/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { checkHandleAvailability, useUser, updateHandle } from '@jam/api-client';
import { mockDeep } from 'jest-mock-extended';
import EditHandleScreen, {
  EditHandleScreenModalProps,
} from '../../../src/navigation/settings/screens/EditHandleScreen';
import { LISTENER } from '../../fixtures/users';
import renderWithTheme from '../../utils/renderWithTheme';

const mockUseUser = jest.mocked<typeof useUser>(useUser);
const mockUpdateHandle = jest.mocked<typeof updateHandle>(updateHandle);
const mockCheckHandleAvailability = jest.mocked<typeof checkHandleAvailability>(checkHandleAvailability);
const mockedNavigationProps: EditHandleScreenModalProps = { navigation: mockDeep(), route: mockDeep() };

describe('Tests EditHandle page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUser.mockReturnValue({ data: LISTENER, mutate: jest.fn(), isValidating: false });
  });

  it('Check if screen is rendered properly ', async () => {
    renderWithTheme(<EditHandleScreen {...mockedNavigationProps} />);
    const usernameText = screen.getByTestId('new-handle-label').children[0];
    await waitFor(() => {
      expect(usernameText).toBe('New Username');
    });
  });

  it('Form accepts a new handle that meets requirements ', async () => {
    mockCheckHandleAvailability.mockResolvedValue({
      available: true,
    });
    renderWithTheme(<EditHandleScreen {...mockedNavigationProps} />);

    fireEvent.changeText(screen.getByTestId('new-handle'), 'HarryPotter');
    const saveButton = screen.getByTestId('save-handle-button');

    await waitFor(() => {
      expect(mockCheckHandleAvailability).toHaveBeenCalledWith('HarryPotter');
      // we do this to verify that the button is enabled but when we move from tailwind this won't work
      expect(saveButton.props.className).toContain('bg-plum-1');
    });

    fireEvent.press(saveButton);
    await waitFor(() => {
      expect(mockUpdateHandle).toHaveBeenCalledWith('HarryPotter');
    });
  });
  it('Validation fails for a handle with invalid characters', async () => {
    mockCheckHandleAvailability.mockResolvedValue({
      available: true,
    });
    renderWithTheme(<EditHandleScreen {...mockedNavigationProps} />);

    fireEvent.changeText(screen.getByTestId('new-handle'), 'inval#d');
    const saveButton = screen.getByTestId('save-handle-button');

    await waitFor(() => {
      // we do this to verify that the button is enabled but when we move from tailwind this won't work
      expect(saveButton.props.className).toContain('bg-plum-2');
    });

    fireEvent.press(saveButton);
    await waitFor(() => {
      expect(mockUpdateHandle).not.toHaveBeenCalled();
    });
  });
});
