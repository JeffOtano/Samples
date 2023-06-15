/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Alert } from 'react-native';
import { useUser, useUserAggregation, useUserSettings } from '@jam/api-client';
import { mockDeep } from 'jest-mock-extended';
import renderWithTheme from '../../utils/renderWithTheme';
import SettingsHomeScreen, {
  SettingsHomeScreenProps,
  // eslint-disable-next-line object-curly-newline
} from '../../../src/navigation/settings/screens/SettingsHomeScreen';

const mockedUseUserSettings = jest.mocked<typeof useUserSettings>(useUserSettings);
const mockedUseUser = jest.mocked<typeof useUser>(useUser);
const mockedUseUserAggregation = jest.mocked<typeof useUserAggregation>(useUserAggregation);

jest.mock('@react-navigation/native', () => ({ useIsFocused: () => true }));

const mockedNavigationProps: SettingsHomeScreenProps = { navigation: mockDeep(), route: mockDeep() };

describe('SettingsHomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // CAUTION do not call `resetAllMocks() because it resets the async storage mock!
    mockAsyncStorage.clear();
    mockedUseUser.mockReturnValue({ data: undefined, mutate: jest.fn(), isValidating: true });
    mockedUseUserSettings.mockReturnValue({ data: undefined, mutate: jest.fn(), isValidating: true });
    mockedUseUserAggregation.mockReturnValue({ data: undefined, mutate: jest.fn(), isValidating: true });
  });

  it('Renders correctly', async () => {
    renderWithTheme(<SettingsHomeScreen {...mockedNavigationProps} />);
    const logoutButton = screen.getByTestId('LogoutButton');
    expect(logoutButton).toBeDefined();
  });

  it('Navigates to LoginStack on logout', async () => {
    renderWithTheme(<SettingsHomeScreen {...mockedNavigationProps} />);

    const logoutButton = screen.getByTestId('LogoutButton');

    await waitFor(async () => {
      fireEvent.press(logoutButton);
      const spyAlert = jest.spyOn(Alert, 'alert');
      spyAlert.mock.calls[0][2][0].onPress();
      expect(mockedNavigationProps.navigation.replace).toHaveBeenCalledWith('LoginStack');
    });
  });

  it('Ensures that the mock async storage module is behaving', async () => {
    const testToken = 'testToken';
    await mockAsyncStorage.setItem('accessToken', testToken);
    const accessToken = await mockAsyncStorage.getItem('accessToken');
    expect(accessToken).toBe(testToken);
  });
  it('Clears async storage on logout and does not have an access token', async () => {
    const testToken = 'testToken';

    renderWithTheme(<SettingsHomeScreen {...mockedNavigationProps} />);

    await waitFor(async () => {
      await mockAsyncStorage.setItem('accessToken', testToken);
      const accessToken = await mockAsyncStorage.getItem('accessToken');
      expect(accessToken).toBe(testToken);
    });

    await waitFor(async () => {
      const logoutButton = screen.getByTestId('LogoutButton');
      fireEvent.press(logoutButton);
      const spyAlert = jest.spyOn(Alert, 'alert');
      spyAlert.mock.calls[0][2][0].onPress();
      expect(mockAsyncStorage.clear).toHaveBeenCalled();
      expect(mockedNavigationProps.navigation.replace).toHaveBeenCalledWith('LoginStack');
    });

    await waitFor(async () => {
      const nullToken = await mockAsyncStorage.getItem('accessToken');
      expect(nullToken).toBeNull();
    });
  });

  it('Defaults to SMS enabled when setting is absent', async () => {
    mockedUseUserSettings.mockReturnValue({ data: {}, mutate: jest.fn(), isValidating: false });
    renderWithTheme(<SettingsHomeScreen {...mockedNavigationProps} />);
    const smsSwitch = screen.getByTestId('smsSwitch');
    await waitFor(() => {
      expect(smsSwitch.props.value).toBe(true);
    });
  });

  it('Shows SMS enabled when setting is optedIn', async () => {
    mockedUseUserSettings.mockReturnValue({
      data: { 'sms.optOutStatus': 'optedIn' },
      mutate: jest.fn(),
      isValidating: false,
    });
    renderWithTheme(<SettingsHomeScreen {...mockedNavigationProps} />);
    const smsSwitch = screen.getByTestId('smsSwitch');
    await waitFor(() => {
      expect(smsSwitch.props.value).toBe(true);
    });
  });

  it('Shows SMS disabled when setting is optedOut', async () => {
    mockedUseUserSettings.mockReturnValue({
      data: { 'sms.optOutStatus': 'optedOut' },
      mutate: jest.fn(),
      isValidating: false,
    });
    renderWithTheme(<SettingsHomeScreen {...mockedNavigationProps} />);
    const smsSwitch = screen.getByTestId('smsSwitch');
    await waitFor(() => {
      expect(smsSwitch.props.value).toBe(false);
    });
  });
});
