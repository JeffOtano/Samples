import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InviteHomeScreen from './screens/InviteHomeScreen';
import { InviteStackParamList } from '../../types';
import HeaderOptions from '../../components/HeaderOptions';

const Stack = createNativeStackNavigator<InviteStackParamList>();

export default function InviteStack() {
  return (
    <Stack.Navigator screenOptions={HeaderOptions()}>
      <Stack.Screen name="InviteHome" options={{ headerShown: false }} component={InviteHomeScreen} />
    </Stack.Navigator>
  );
}
