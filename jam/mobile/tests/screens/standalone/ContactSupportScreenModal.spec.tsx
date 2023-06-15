/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import { sendSupportMessage, useUser } from '@jam/api-client';

import ContactSupportScreenModal from '../../../src/navigation/standalone/ContactSupportScreenModal';
import renderWithTheme from '../../utils/renderWithTheme';
import { LISTENER } from '../../fixtures/users';

const mockSendSupportMessage = jest.mocked<typeof sendSupportMessage>(sendSupportMessage);

const mockMessage = 'This message is fake.';
const mockEmail = 'listener@example.com';
const mockUseUser = jest.mocked<typeof useUser>(useUser);

const createNavigationTestProps = (props: Object) => ({
  navigation: { navigate: jest.fn(), replace: jest.fn() },
  ...props,
});

describe('ContactSupportScreenModal', () => {
  let navigationProps: any;
  beforeEach(() => {
    navigationProps = createNavigationTestProps({});
    jest.clearAllMocks();
    mockUseUser.mockReturnValue({ data: LISTENER, mutate: jest.fn(), isValidating: false });
  });
  it('Renders correctly', async () => {
    renderWithTheme(<ContactSupportScreenModal {...navigationProps} />);
    expect(screen.getByTestId('support-message')).toBeDefined();
    const sendButton = screen.getByTestId('send-support-message');
    expect(sendButton).toBeDefined();
  });
  it('Calls postMessageToCreator with the correct segment id and message', async () => {
    renderWithTheme(<ContactSupportScreenModal {...navigationProps} />);
    fireEvent.changeText(screen.getByTestId('support-message'), mockMessage || '');
    fireEvent.changeText(screen.getByTestId('sender-email'), mockEmail || '');
    fireEvent.press(screen.getByTestId('send-support-message'));

    await waitFor(async () => {
      expect(mockSendSupportMessage).toHaveBeenCalledWith(mockMessage, mockEmail);
    });
  });
});
