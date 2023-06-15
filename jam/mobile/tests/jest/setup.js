/* eslint-disable @typescript-eslint/no-empty-function */
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import 'styled-components/native';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@datadog/mobile-react-native');
jest.mock('nativewind');
jest.mock('react-native-svg');
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('react-native-device-info', () => {});
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('@nandorojo/swr-react-native', () => ({
  useSWRNativeRevalidate: jest.fn(),
}));
jest.mock('react-native-localize', () => {
  return {
    getTimeZone: jest.fn(),
  };
});
jest.mock('react-native-onesignal', () => {});
// Uncommenting the below line makes warnings go away for most of our tests, but it comes at the cost of the
// Login test not working. Until we solve the latter, we shouldn't commit it uncommented, but it can be useful
// to cut through the noise when you're troubleshooting other tests
// jest.mock('react-native-country-picker-modal');

jest.mock('react-native-sound', () => {
  const SoundMocked = () => {};
  SoundMocked.prototype.play = function (onEnd) {
    onEnd();
  };

  SoundMocked.setCategory = jest.fn();
  return SoundMocked;
});
