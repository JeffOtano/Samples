/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { useUser, sendInvitation, useAggregationStreamsInclude } from '@jam/api-client';
import InviteHomeScreen from '../../../src/navigation/invite/screens/InviteHomeScreen';
import { LISTENER } from '../../fixtures/users';
import renderWithTheme from '../../utils/renderWithTheme';

const mockUseAggregationStreamsInclude = jest.mocked<typeof useAggregationStreamsInclude>(useAggregationStreamsInclude);
const mockUseUser = jest.mocked<typeof useUser>(useUser);
const mockSendInvitation = jest.mocked<typeof sendInvitation>(sendInvitation);

describe('Tests invite page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAggregationStreamsInclude.mockReturnValue({ data: undefined, mutate: jest.fn(), isValidating: true });
    mockUseUser.mockReturnValue({ data: LISTENER, mutate: jest.fn(), isValidating: false });
  });

  it('Check if screen is rendered properly ', async () => {
    renderWithTheme(<InviteHomeScreen />);
    const inviteHeaderText = screen.getByTestId('InviteHeader').children[0];
    await waitFor(async () => {
      expect(inviteHeaderText).toBe('Invite a Friend to Try Jam');
    });
  });

  it('Check if the form is working correctly with phone & goes_by ', async () => {
    renderWithTheme(<InviteHomeScreen />);

    fireEvent.changeText(screen.getByTestId('goesBy-field'), LISTENER.goes_by || '');
    fireEvent.changeText(screen.getByTestId('PhoneInput'), LISTENER.phone || '');
    fireEvent.press(screen.getByTestId('send-invitation-button'));

    await waitFor(async () => {
      expect(mockSendInvitation).toHaveBeenCalledWith(
        {
          goes_by: LISTENER.goes_by,
          phone: LISTENER.phone,
          inviterGoesBy: '',
        },
        [],
      );
    });
  });
});
