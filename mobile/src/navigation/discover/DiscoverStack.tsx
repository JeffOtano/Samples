import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from './screens/Category';
import DiscoverScreen from './screens/DiscoverHomeScreen';
import SearchScreen from './screens/Search';
import SegmentScreen from '../standalone/SegmentScreen';
import StreamScreen from '../standalone/StreamScreen';
import StreamTagScreen from '../standalone/StreamTagScreen';
import WebviewScreen from '../standalone/WebviewScreen';
import { DiscoverStackParamList } from '../../types';

import HeaderOptions from '../../components/HeaderOptions';

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export default function DiscoverStackScreen() {
  return (
    <Stack.Navigator screenOptions={HeaderOptions()}>
      <Stack.Screen name="DiscoverHome" component={DiscoverScreen} />
      <Stack.Screen name="Category" options={{ headerShown: true }} component={CategoryScreen} />
      <Stack.Screen name="Search" options={{ headerShown: true }} component={SearchScreen} />
      <Stack.Screen name="Segment" options={{ headerShown: true }} component={SegmentScreen} />
      <Stack.Screen name="Stream" options={{ headerShown: true }} component={StreamScreen} />
      <Stack.Screen name="StreamTag" options={{ headerShown: true }} component={StreamTagScreen} />
      <Stack.Screen name="Webview" options={{ headerShown: true }} component={WebviewScreen} />
    </Stack.Navigator>
  );
}
