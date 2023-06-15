import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParamList } from '../../types';
import LoginHomeScreen from './screens/LoginHomeScreen';
import VerificationScreen from './screens/VerificationScreen';
import TabNavigator from '../TabNavigator';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginHome" component={LoginHomeScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
}
