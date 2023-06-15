import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import classNames from 'classnames';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import colors from '../../colors';
import Headset from './icons/Headset';
import Mail from './icons/Mail';
import Search from './icons/Search';
import Settings from './icons/Settings';
import Player from './player/Player';

function getLabel(options: BottomTabNavigationOptions, route: { name: string }) {
  if (options.tabBarLabel) {
    return options.tabBarLabel.toString();
  }
  if (options.title) {
    return options.title;
  }
  return route.name;
}

function getTabIcon(label: string, isFocused: boolean): JSX.Element {
  switch (label) {
    case 'Listen':
      return <Headset height="24px" width="24px" svgStroke={isFocused && colors.dragonfruit[1]} />;
    case 'Discover':
      return (
        <Search
          height="24px"
          width="24px"
          svgStroke={isFocused && colors.dragonfruit[1]}
          pathFill={isFocused && colors.dragonfruit[1]}
        />
      );
    case 'Invite':
      return <Mail height="24px" width="24px" svgStroke={isFocused && colors.dragonfruit[1]} />;
    case 'Settings':
      return <Settings height="24px" width="24px" svgStroke={isFocused && colors.dragonfruit[1]} />;
    default:
      return <Headset height="24px" width="24px" svgStroke={isFocused && colors.dragonfruit[1]} />;
  }
}

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="bg-white dark:bg-black-0">
      <Player />
      <View className="flex-row bg-gray-6 dark:bg-black-1 px-2 justify-center">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = getLabel(options, route);
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              className="py-3 pb-6 w-1/4 items-center"
            >
              {getTabIcon(label, isFocused)}
              <Text
                className={classNames([
                  'font-sans-normal text-xs text-black-1 dark:text-white',
                  { 'text-dragonfruit-1': isFocused },
                ])}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default TabBar;
