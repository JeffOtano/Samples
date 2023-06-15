/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import { getShareUrl } from '@jam/utils';
import { deleteAggregationStreamIncludes } from '@jam/api-client';
import ThreeDotsMenu from '../../../src/navigation/standalone/ThreeDotsMenu';
import renderWithTheme from '../../utils/renderWithTheme';

jest.mock('@jam/utils', () => ({
  __esModule: true,
  parseDateToLocal: jest.fn(),
  getShareUrl: jest.fn(),
}));

jest.mock('@jam/api-client', () => ({
  __esModule: true,
  deleteAggregationStreamIncludes: jest.fn(),
}));

const mockStreamId = 'mockStreamId';
const mockSegmentPublishUri = 'mockSegmentPublishUri';
const mockStreamPublishUri = 'mockStreamPublishUri';
const mockPlaylistSegment = {
  publishUri: mockSegmentPublishUri,
  stream: { id: mockStreamId, publish_uri: mockStreamPublishUri },
};
const mockShareUrl = `https://jam.ai/jam/${mockStreamPublishUri}/${mockSegmentPublishUri}`;
const mockGetShareUrl = jest.mocked(getShareUrl).mockReturnValue(mockShareUrl);

const createNavigationTestProps = (props: Object) => ({
  navigation: { navigate: jest.fn(), replace: jest.fn() },
  route: { params: { segment: mockPlaylistSegment } },
  ...props,
});

describe('ThreeDotsMenu', () => {
  let navigationProps: any;
  beforeEach(() => {
    navigationProps = createNavigationTestProps({});
    jest.clearAllMocks();
  });
  it('Renders correctly', async () => {
    renderWithTheme(<ThreeDotsMenu {...navigationProps} />);
    const shareButton = screen.getByTestId('Share');
    expect(shareButton).toBeDefined();
  });
  it('Calls share with the correct segment link', async () => {
    renderWithTheme(<ThreeDotsMenu {...navigationProps} />);
    const shareButton = screen.getByTestId('Share');

    await waitFor(() => {
      fireEvent.press(shareButton);
      expect(mockGetShareUrl).toHaveBeenCalledWith(mockPlaylistSegment);
    });
  });
  it('Navigates to the correct stream page when View All Episodes is pressed', async () => {
    renderWithTheme(<ThreeDotsMenu {...navigationProps} />);
    const viewAllEpisodesButton = screen.getByTestId('View All Episodes');

    await waitFor(() => {
      fireEvent.press(viewAllEpisodesButton);
      expect(navigationProps.navigation.navigate).toHaveBeenCalledWith('Stream', { streamId: mockStreamId });
    });
  });
  it('Calls deleteAggregationStreamIncludes with the correct stream id when Remove From Playlist is pressed', async () => {
    renderWithTheme(<ThreeDotsMenu {...navigationProps} />);
    const removeFromPlaylistButton = screen.getByTestId('Remove From Playlist');

    await waitFor(() => {
      fireEvent.press(removeFromPlaylistButton);
      expect(deleteAggregationStreamIncludes).toHaveBeenCalledWith(mockStreamId);
    });
  });
});
