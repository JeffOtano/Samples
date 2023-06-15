import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListenHomeScreen from './screens/ListenHomeScreen';
import SegmentScreen from '../standalone/SegmentScreen';
import StreamScreen from '../standalone/StreamScreen';
import WebviewScreen from '../standalone/WebviewScreen';
import { ListenStackParamList } from '../../types';
import HeaderOptions from '../../components/HeaderOptions';

const Stack = createNativeStackNavigator<ListenStackParamList>();

export default function ListenStack() {
  return (
    <Stack.Navigator screenOptions={HeaderOptions()}>
      <Stack.Screen name="ListenHome" component={ListenHomeScreen} />
      <Stack.Screen name="Segment" options={{ headerShown: true }} component={SegmentScreen} />
      <Stack.Screen name="Stream" options={{ headerShown: true }} component={StreamScreen} />
      <Stack.Screen name="Webview" options={{ headerShown: true }} component={WebviewScreen} />
    </Stack.Navigator>
  );
}
