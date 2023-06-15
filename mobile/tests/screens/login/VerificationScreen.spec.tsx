/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react-native';
import ApiClient, { loginWithOtp } from '@jam/api-client';
import { mockClear, mockReset } from 'jest-mock-extended';
import VerificationScreen from '../../../src/navigation/login/screens/VerificationScreen';

const PHONE_NUMBER = '+11234567890';

const mockedApiClient = jest.mocked<typeof ApiClient>(ApiClient);
const mockedLoginWithOtp = jest.mocked<typeof loginWithOtp>(loginWithOtp);

const createNavigationTestProps = (props: Object) => ({
  navigation: { navigate: jest.fn(), replace: jest.fn() },
  // TODO@curthipster I spent some time trying to make this work with mockDeep like we do in
  // SettingsHomeScreen.spec.tsx and couldn't figure out how to get params to work. Come back to this.
  route: { params: { phoneNumber: PHONE_NUMBER } },
  ...props,
});

describe('VerificationScreen', () => {
  let mockedNavigationProps: any;
  beforeEach(() => {
    mockedNavigationProps = createNavigationTestProps({});
    jest.clearAllMocks();
    mockClear(mockedApiClient);
    mockReset(mockedApiClient);
  });

  it('Renders correctly', () => {
    render(<VerificationScreen {...mockedNavigationProps} />);
    const verificationHeaderText = screen.getByTestId('VerificationHeader').children[0];
    expect(verificationHeaderText).toBe(`Verify It's You`);
  });

  it('Sends the OTP code when given a 6 digit code', async () => {
    const verificationCode = '123456';
    render(<VerificationScreen {...mockedNavigationProps} />);
    const codeInput = screen.getByTestId('VerificationCodeInput');

    await waitFor(async () => {
      fireEvent.changeText(codeInput, verificationCode);
      expect(codeInput.props.value).toBe(verificationCode);
      expect(mockedLoginWithOtp).toHaveBeenCalledWith(PHONE_NUMBER, verificationCode);
    });
  });

  it('Navigates to the TabNavigator when verification is complete', async () => {
    const verificationCode = '555555';
    const accessToken = 'access-token';
    render(<VerificationScreen {...mockedNavigationProps} />);
    const codeInput = screen.getByTestId('VerificationCodeInput');

    mockedLoginWithOtp.mockResolvedValue({ token: accessToken });

    await waitFor(async () => {
      fireEvent.changeText(codeInput, verificationCode);
      expect(mockedLoginWithOtp).toHaveBeenCalledWith(PHONE_NUMBER, verificationCode);
      expect(mockedLoginWithOtp).toHaveBeenCalledTimes(1);
      expect(mockedApiClient.updateAccessToken).toHaveBeenCalledWith(accessToken);
      expect(mockedNavigationProps.navigation.replace).toHaveBeenCalledWith('TabNavigator');
    });
  });

  it('Does not send the otp verification with an incomplete code', async () => {
    const invalidVerificationCode = '12345';
    render(<VerificationScreen {...mockedNavigationProps} />);
    const codeInput = screen.getByTestId('VerificationCodeInput');

    await waitFor(async () => {
      fireEvent.changeText(codeInput, invalidVerificationCode);
      expect(mockedLoginWithOtp).not.toHaveBeenCalled();
    });
  });

  it('Does not navigate to TabNavigator with an invalid code', async () => {
    const invalidVerificationCode = '999999';
    jest.mocked(mockedLoginWithOtp).mockRejectedValue(new Error('Invalid code'));
    render(<VerificationScreen {...mockedNavigationProps} />);
    const codeInput = screen.getByTestId('VerificationCodeInput');

    await waitFor(async () => {
      fireEvent.changeText(codeInput, invalidVerificationCode);
      expect(mockedLoginWithOtp).toHaveBeenCalledWith(PHONE_NUMBER, invalidVerificationCode);
      expect(mockedLoginWithOtp).toHaveBeenCalledTimes(1);
      expect(mockedNavigationProps.navigation.replace).not.toHaveBeenCalled();
    });
  });
});
