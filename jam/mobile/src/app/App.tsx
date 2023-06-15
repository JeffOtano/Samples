/* eslint-disable react/jsx-props-no-spreading */
import { SWRConfig } from 'swr';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { DdSdkReactNative } from '@datadog/mobile-react-native';
import { AppState, AppStateStatus, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiClient from '@jam/api-client';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Config from 'react-native-config';
import { ThemeProvider } from 'styled-components/native';
import TabNavigator from '../navigation/TabNavigator';
import config from '../../datadog';
import LoginStack from '../navigation/login/LoginStack';
import SplashScreen from '../navigation/Splash';
import { RootStackParamList } from '../types';
import ThreeDotsMenu from '../navigation/standalone/ThreeDotsMenu';
import SendMessageScreenModal from '../navigation/standalone/SendMessageScreenModal';
import { initializeSonics } from '../lib/utils/sonics';
import { restoreAccessToken } from '../lib/auth-manager';
import swrLoggerMiddleware from '../lib/swr-logger-middleware';
import { darkTheme, lightTheme } from '../../theme';
import Toast from '../navigation/standalone/Toast';
import ContactSupportScreenModal from '../navigation/standalone/ContactSupportScreenModal';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const navigationRef = React.useRef(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const initializeDatadog = async () => {
      await DdSdkReactNative.initialize(config);
    };

    initializeSonics();
    initializeDatadog();
  }, []);

  useEffect(() => {
    ApiClient.apiRoot = Config.API_ROOT;
    restoreAccessToken();
  }, []);

  return (
    <SafeAreaProvider>
      <Toast />
      <SWRConfig
        value={{
          fetcher: (path: string, params?: object) => ApiClient.get(path, params),
          provider: () => new Map(),
          isOnline() {
            /*
            This function allows us to customize behavior on whether the app is online.
            By default, SWR will bail out of revalidation if the condition is not met.
          */
            return true;
          },
          isVisible() {
            /*
            This function allows us to customize behavior on whether the app is visible.
            App visibility is determined by the AppState API, eg. if the app is in the background.
            By default, SWR will bail out of revalidation if the condition is not met.
          */
            return true;
          },
          initFocus(callback: () => void) {
            let appState = AppState.currentState;

            const onAppStateChange = (nextAppState: AppStateStatus) => {
              /* If it's resuming from background or inactive mode to active one */
              if (appState.match(/inactive|background/) && nextAppState === 'active') {
                callback();
              }
              appState = nextAppState;
            };

            // Subscribe to the app state change events
            const subscription = AppState.addEventListener('change', onAppStateChange);

            return () => {
              subscription.remove();
            };
          },
          initReconnect() {
            /* Register the listener with your state provider */
          },
          use: [swrLoggerMiddleware],
        }}
      >
        <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
            }}
          >
            <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
              <RootStack.Group>
                <RootStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <RootStack.Screen name="TabNavigator" component={TabNavigator} />
                <RootStack.Screen name="LoginStack" component={LoginStack} />
              </RootStack.Group>
              <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen
                  options={{
                    presentation: 'modal',
                    contentStyle: { backgroundColor: 'transparent' },
                  }}
                  name="ThreeDotsMenu"
                  component={ThreeDotsMenu}
                />
                <RootStack.Screen
                  options={{
                    presentation: 'fullScreenModal',
                    contentStyle: { backgroundColor: 'transparent' },
                  }}
                  name="SendMessageScreenModal"
                  component={SendMessageScreenModal}
                />
                <RootStack.Screen
                  options={{
                    presentation: 'fullScreenModal',
                    contentStyle: { backgroundColor: 'transparent' },
                  }}
                  name="ContactSupportScreenModal"
                  component={ContactSupportScreenModal}
                />
              </RootStack.Group>
            </RootStack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SWRConfig>
    </SafeAreaProvider>
  );
}
