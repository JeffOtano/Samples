/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react-native';
import LoginHomeScreen from '../../../src/navigation/login/screens/LoginHomeScreen';

jest.mock('@jam/api-client', () => ({
  __esModule: true,
  requestLoginOtp: jest.fn().mockResolvedValue(true),
}));

const createNavigationTestProps = (props: Object) => ({
  navigation: { navigate: jest.fn() },
  ...props,
});

const TEST_PHONE_NUMBER = '4255555555';
const FORMATTED_PHONE_NUMBER = '+14255555555';
const INVALID_PHONE_NUMBER = '1234567890';

describe('LoginHomeScreen', () => {
  let navigationProps: any;
  beforeEach(() => {
    jest.clearAllMocks();
    navigationProps = createNavigationTestProps({});
  });
  it('Renders correctly', async () => {
    render(<LoginHomeScreen {...navigationProps} />);
    const loginHeaderText = screen.getByTestId('LoginHeader').children[0];

    await waitFor(async () => {
      expect(loginHeaderText).toBe('Enter Your Phone Number to Continue');
    });
  });

  it('Has a disabled button with an invalid phone number', async () => {
    render(<LoginHomeScreen {...navigationProps} />);
    const loginButton = screen.getByTestId('LoginButton');
    const phoneInput = screen.getByTestId('PhoneInput');

    await waitFor(() => {
      expect(phoneInput.props.value).toBe('');
      fireEvent.changeText(phoneInput, INVALID_PHONE_NUMBER);
      expect(phoneInput.props.value).toBe(INVALID_PHONE_NUMBER);
      expect(loginButton.props.accessibilityState.disabled).toBe(true);
    });
  });

  it('Has an enabled button with a valid phone number', async () => {
    render(<LoginHomeScreen {...navigationProps} />);

    const phoneInput = screen.getByTestId('PhoneInput');
    const loginButton = screen.getByTestId('LoginButton');
    expect(phoneInput.props.value).toBe('');

    await waitFor(async () => {
      fireEvent.changeText(phoneInput, TEST_PHONE_NUMBER);
      expect(phoneInput.props.value).toBe(TEST_PHONE_NUMBER);
      expect(loginButton.props.accessibilityState.disabled).toBe(false);
    });
  });

  it('Navigates to the verification screen when the phone number is valid and button is pressed', async () => {
    render(<LoginHomeScreen {...navigationProps} />);
    const phoneInput = screen.getByTestId('PhoneInput');
    const loginButton = screen.getByTestId('LoginButton');

    await waitFor(async () => {
      fireEvent.changeText(phoneInput, TEST_PHONE_NUMBER);
      fireEvent.press(loginButton);
      expect(navigationProps.navigation.navigate).toHaveBeenCalledWith('Verification', {
        phoneNumber: FORMATTED_PHONE_NUMBER,
        // eslint-disable-next-line object-curly-newline
      });
    });
  });

  it('Does not navigate to the verification screen when the phone number is invalid and button is pressed', async () => {
    render(<LoginHomeScreen {...navigationProps} />);
    const phoneInput = screen.getByTestId('PhoneInput');
    const loginButton = screen.getByTestId('LoginButton');

    await waitFor(async () => {
      fireEvent.changeText(phoneInput, INVALID_PHONE_NUMBER);
      fireEvent.press(loginButton);
      expect(navigationProps.navigation.navigate).not.toHaveBeenCalled();
    });
  });
});
