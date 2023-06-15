import ApiClient from '@jam/api-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import SplashImage from '../components/SplashImage';
import { debugAuth } from '../lib/auth-manager';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const getLoggedInState = async () => {
      const loggedIn = ApiClient.hasAccessToken;
      if (loggedIn === true) {
        debugAuth('Proceeding to TabNavigator');
        navigation.replace('TabNavigator');
      } else {
        debugAuth('Redirecting to LoginStack');
        navigation.replace('LoginStack');
      }
    };

    getLoggedInState();
  }, [navigation]);

  return (
    <View testID="Splash" className="flex flex-1 w-full h-full bg-plum-1">
      <SplashImage containerClassName="w-full h-full" imageClassName="w-full h-full" />
    </View>
  );
}

export default SplashScreen;
