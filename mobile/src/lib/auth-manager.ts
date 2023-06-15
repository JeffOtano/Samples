import ApiClient from '@jam/api-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const ACCESS_TOKEN_KEY = 'accessToken';
const AUTH_LOGGER_ENABLED = Config.AUTH_LOGGER === 'true';

export function debugAuth(msg: string) {
  if (AUTH_LOGGER_ENABLED) {
    // eslint-disable-next-line no-console
    console.log(`AUTH: ${msg}`);
  }
}

export async function setAccessToken(token: string) {
  ApiClient.updateAccessToken(token);
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export async function logout() {
  await AsyncStorage.clear();
  ApiClient.clearAccessToken();
}

export async function restoreAccessToken(): Promise<boolean> {
  debugAuth('Reading access token');
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (!!token && token.length > 0) {
    debugAuth('Found access token; initializing client');
    ApiClient.updateAccessToken(token);
    return true;
  }
  debugAuth('No access token found');
  return false;
}
