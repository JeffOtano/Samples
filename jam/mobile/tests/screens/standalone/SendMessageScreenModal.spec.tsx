/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import { postMessageToCreator } from '@jam/api-client';
import SendMessageScreenModal from '../../../src/navigation/standalone/SendMessageScreenModal';
import renderWithTheme from '../../utils/renderWithTheme';

const mockPostMessageToCreator = jest.mocked<typeof postMessageToCreator>(postMessageToCreator);

const mockSegmentId = 'mockSegmentId';
const mockSegmentTitle = 'mockSegmentTitle';
const mockMessage = 'This message is fake.';

const createNavigationTestProps = (props: Object) => ({
  navigation: { navigate: jest.fn(), replace: jest.fn() },
  route: { params: { segmentId: mockSegmentId, title: mockSegmentTitle } },
  ...props,
});

describe('SendMessageScreenModal', () => {
  let navigationProps: any;
  beforeEach(() => {
    navigationProps = createNavigationTestProps({});
    jest.clearAllMocks();
  });
  it('Renders correctly', async () => {
    renderWithTheme(<SendMessageScreenModal {...navigationProps} />);
    expect(screen.getByTestId('message')).toBeDefined();
    const sendButton = screen.getByTestId('send-message-creator');
    expect(sendButton).toBeDefined();
  });
  it('Calls postMessageToCreator with the correct segment id and message', async () => {
    renderWithTheme(<SendMessageScreenModal {...navigationProps} />);
    fireEvent.changeText(screen.getByTestId('message'), mockMessage || '');
    fireEvent.press(screen.getByTestId('send-message-creator'));

    await waitFor(async () => {
      expect(mockPostMessageToCreator).toHaveBeenCalledWith(mockSegmentId, mockMessage);
    });
  });
});
