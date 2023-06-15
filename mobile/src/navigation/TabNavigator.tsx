import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListenStack from './listen/ListenStack';
import DiscoverStack from './discover/DiscoverStack';
import InviteStack from './invite/InviteStack';
import SettingsStack from './settings/SettingsStack';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator backBehavior="history" tabBar={(props) => TabBar(props)} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Listen" component={ListenStack} />
      <Tab.Screen name="Discover" component={DiscoverStack} />
      <Tab.Screen name="Invite" component={InviteStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}
