import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsHomeScreen from './screens/SettingsHomeScreen';
import StreamScreen from '../standalone/StreamScreen';
import EditPlaylistScreen from './screens/EditPlaylistScreen';
import EditHandleScreen from './screens/EditHandleScreen';
import { SettingsStackParamList } from '../../types';
import StreamTagScreen from '../standalone/StreamTagScreen';
import SegmentScreen from '../standalone/SegmentScreen';
import HeaderOptions from '../../components/HeaderOptions';
import DeveloperScreen from './screens/DeveloperScreen';
import DeliveryTimeScreen from './screens/DeliveryTimeScreen';
import WebviewScreen from '../standalone/WebviewScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={HeaderOptions()}>
      <Stack.Screen name="SettingsHome" component={SettingsHomeScreen} />
      <Stack.Screen name="Stream" options={{ headerShown: true }} component={StreamScreen} />
      <Stack.Screen name="Segment" options={{ headerShown: true }} component={SegmentScreen} />
      <Stack.Screen name="Developer" component={DeveloperScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Webview" options={{ headerShown: true }} component={WebviewScreen} />
      <Stack.Screen
        name="DeliveryTime"
        component={DeliveryTimeScreen}
        options={{ headerShown: true, title: 'Delivery Time' }}
      />
      <Stack.Screen
        name="EditPlaylist"
        options={{
          headerShown: true,
          title: 'Edit Playlist',
        }}
        component={EditPlaylistScreen}
      />
      <Stack.Screen name="StreamTag" options={{ headerShown: true }} component={StreamTagScreen} />
      <Stack.Screen
        name="EditHandle"
        options={{
          headerShown: true,
          title: 'Username',
        }}
        component={EditHandleScreen}
      />
    </Stack.Navigator>
  );
}
