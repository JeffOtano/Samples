/* eslint-disable no-console */
// TODO@leira remove this rule exception
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, AlertButton, Pressable, Switch, Text, useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import { deleteUser, updateUserSetting, useUser, useUserAggregation, useUserSettings } from '@jam/api-client';
import { parseDateToLocal } from '@jam/utils';

import { useSWRNativeRevalidate } from '@nandorojo/swr-react-native';
import toast from '../../../lib/utils/toast';
import colors from '../../../../colors';
import { logout } from '../../../lib/auth-manager';
import { SettingsStackParamList } from '../../../types';
import { FOCUS_INTERVAL_THROTTLE } from '../../../lib/swr';

import {
  Attention,
  ChangePlaylist,
  Chevron,
  Edit,
  Headphones,
  Invite,
  Like,
  PushNotification,
  Record,
  SignOut,
  Support,
  Time,
} from '../../../components/icons';

const AVAILABLE_TIMES = {
  morning: [
    { id: 5, string: '5 am' },
    { id: 6, string: '6 am' },
    { id: 7, string: '7 am' },
    { id: 8, string: '8 am' },
    { id: 9, string: '9 am' },
    { id: 10, string: '10 am' },
    { id: 11, string: '11 am' },
  ],
  afternoon: [
    { id: 12, string: '12 pm - noon' },
    { id: 13, string: '1 pm' },
    { id: 14, string: '2 pm' },
    { id: 15, string: '3 pm' },
    { id: 16, string: '4 pm' },
    { id: 17, string: '5 pm' },
  ],
  evening: [
    { id: 18, string: '6 pm' },
    { id: 19, string: '7 pm' },
    { id: 20, string: '8 pm' },
    { id: 21, string: '9 pm' },
    { id: 22, string: '10 pm' },
    { id: 23, string: '11 pm' },
  ],
  night: [
    { id: 0, string: '12 am - midnight' },
    { id: 1, string: '1 am' },
    { id: 2, string: '2 am' },
    { id: 3, string: '3 am' },
    { id: 4, string: '4 am' },
  ],
};

const INITIAL_DELIVERY_TIME = 8;

export type SettingsHomeScreenProps = NativeStackScreenProps<SettingsStackParamList, 'SettingsHome'>;

export default function SettingsHomeScreen({ navigation }: SettingsHomeScreenProps) {
  const [shouldSendPlaylistSMS, setShouldSendPlaylistSMS] = useState(true);
  const [currentDeliveryTime, setCurrentDeliveryTime] = useState('');
  const { data: user, mutate: mutateUser } = useUser();
  useSWRNativeRevalidate({ mutate: mutateUser, focusThrottleInterval: FOCUS_INTERVAL_THROTTLE });
  const { data: userSettings, mutate: mutateUserSettings } = useUserSettings('sms.optOutStatus');
  const { data: userAggregation, mutate: mutateUseUserAggregation } = useUserAggregation();
  useSWRNativeRevalidate({ mutate: mutateUseUserAggregation, focusThrottleInterval: FOCUS_INTERVAL_THROTTLE });
  const isDarkMode = useColorScheme() === 'dark';
  const isFocused = useIsFocused();

  const handleLogout = useCallback(async () => {
    await logout();
    navigation.replace('LoginStack');
  }, [navigation]);

  const gotoDeveloper = useCallback(() => {
    navigation.push('Developer');
  }, [navigation]);

  const handleSmsSettings = useCallback(
    async (optInStatus: boolean) => {
      try {
        setShouldSendPlaylistSMS(optInStatus);
        await updateUserSetting('sms.optOutStatus', optInStatus ? 'optedIn' : 'optedOut');
        mutateUserSettings();
      } catch (error) {
        // TODO https://github.com/altoindustries/jam/issues/174
        toast.danger({ message: `We had an issue updating your settings. Contact support.` });
      }
    },
    [mutateUserSettings],
  );

  useEffect(() => {
    if (userSettings) {
      setShouldSendPlaylistSMS(userSettings['sms.optOutStatus'] !== 'optedOut');
    }
  }, [userSettings]);

  useEffect(() => {
    if (isFocused) {
      const time = userAggregation?.hour_local;
      let newDeliveryTime;
      if (!time) {
        newDeliveryTime = AVAILABLE_TIMES.morning.find((deliveryTime) => deliveryTime.id === INITIAL_DELIVERY_TIME);
      } else if (time < 5) {
        newDeliveryTime = AVAILABLE_TIMES.night.find((deliveryTime) => deliveryTime.id === time);
      } else if (time >= 5 && time < 12) {
        newDeliveryTime = AVAILABLE_TIMES.morning.find((deliveryTime) => deliveryTime.id === time);
      } else if (time >= 12 && time < 18) {
        newDeliveryTime = AVAILABLE_TIMES.afternoon.find((deliveryTime) => deliveryTime.id === time);
      } else if (time >= 18) {
        newDeliveryTime = AVAILABLE_TIMES.evening.find((deliveryTime) => deliveryTime.id === time);
      } else {
        newDeliveryTime = AVAILABLE_TIMES.morning.find((deliveryTime) => deliveryTime.id === INITIAL_DELIVERY_TIME);
      }
      setCurrentDeliveryTime(newDeliveryTime.string);
    }
  }, [userAggregation, isFocused]);

  const handleDeleteAccount = useCallback(() => {
    async function deleteAccount() {
      try {
        await deleteUser();
        await handleLogout();
      } catch (error) {
        Alert.alert(
          'Please contact support',
          'We are having an issue deleting your account. Please contact Jam support, and we will take care of it.',
          [{ style: 'default' }],
        );
      }
    }

    const message = shouldSendPlaylistSMS
      ? 'Deleting your account will permanently remove all of your data. If you just want to stop receiving notifications, you can disable SMS.'
      : 'Deleting your account will permanently remove all of your data.';

    const buttons: AlertButton[] = [
      {
        text: 'Delete Account',
        onPress: () => deleteAccount(),
        style: 'destructive',
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ];
    if (shouldSendPlaylistSMS) {
      buttons.splice(1, 0, {
        text: 'Disable SMS',
        onPress: () => handleSmsSettings(false),
        style: 'default',
      });
    }

    Alert.alert('Are you sure?', message, buttons, { cancelable: true });
  }, [handleLogout, handleSmsSettings, shouldSendPlaylistSMS]);

  return (
    <SafeAreaView className="flex flex-1 bg-white dark:bg-black-0">
      <ScrollView>
        {user && (
          <View className="justify-center items-center my-6">
            <View className="bg-plum-2 mb-6 dark:bg-dragonfruit-1.5 p-5 rounded-full">
              <Headphones width="25px" height="24px" pathStroke={isDarkMode ? colors.dragonfruit[1] : colors.plum[1]} />
            </View>
            <View className="flex flex-row mb-3 items-center">
              <Text className="text-2xl font-sans-normal dark:text-white">@{user?.handle || user?.goes_by}</Text>
              <Pressable className="ml-2" onPress={() => navigation.navigate('EditHandle')}>
                <Edit height="16px" width="16px" pathStroke={isDarkMode ? colors.white : colors.black[1]} />
              </Pressable>
            </View>
            {user && (
              <Text className="text-sm font-sans-normal text-gray-2 dark:text-gray-4">{`Jam listener since ${parseDateToLocal(
                {
                  date: user?.created_at,
                  dateStyle: 'medium',
                },
              )}`}</Text>
            )}
          </View>
        )}

        {/* Edit Playlist */}
        <Pressable onPress={() => navigation.navigate('EditPlaylist')} className="mx-6 my-4 flex-row justify-between">
          <View className="flex-row">
            <ChangePlaylist height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold dark:text-white">Edit Playlist</Text>
          </View>
          <View className="flex-row items-center">
            <Chevron svgStroke={isDarkMode ? colors.gray[4] : colors.gray[2]} height="24px" width="24px" />
          </View>
        </Pressable>

        {/* Delivery Time */}
        <Pressable onPress={() => navigation.navigate('DeliveryTime')} className="mx-6 my-4 flex-row justify-between">
          <View className="flex-row">
            <Time height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold dark:text-white">Delivery Time</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="font-sans-normal text-gray-2 dark:text-gray-4 text-sm ">
              {currentDeliveryTime.toUpperCase()}
            </Text>
            <Chevron svgStroke={isDarkMode ? colors.gray[4] : colors.gray[2]} height="24px" width="24px" />
          </View>
        </Pressable>

        {/* Send Playlist via SMS */}
        <View className="mx-6 my-4 flex-row justify-between">
          <View className="flex-row">
            <PushNotification height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold dark:text-white">Send Playlist via SMS</Text>
          </View>
          <Switch
            testID="smsSwitch"
            trackColor={{ false: '#D2B2EB', true: '#6900bc' }}
            thumbColor="#f4f3f4"
            ios_backgroundColor="#3e3e3e"
            onValueChange={(newOptOutSwitchValue) => handleSmsSettings(newOptOutSwitchValue)}
            value={shouldSendPlaylistSMS}
          />
        </View>

        {/* Invite a Friend */}
        <Pressable onPress={() => navigation.navigate('Invite')} className="mx-6 my-4 flex-row justify-between">
          <View className="flex-row">
            <Invite height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold dark:text-white">Invite a Friend</Text>
          </View>
        </Pressable>

        {/* Record My Own Jam */}
        <Pressable
          onPress={() =>
            navigation.navigate('Webview', {
              uri: `https://jammm.typeform.com/new-jam#name=${user.goes_by}&email=${user.email}&uid=${user.id}`,
              // eslint-disable-next-line object-curly-newline
            })
          }
          className="mx-6 my-4 flex-row justify-between"
        >
          <View className="flex-row">
            <Record height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold dark:text-white">Record My Own Jam</Text>
          </View>
        </Pressable>

        {/* Contact Jam Support */}
        <Pressable
          onPress={() => navigation.navigate('ContactSupportScreenModal')}
          className="mx-6 my-4 flex-row justify-between"
        >
          <View className="flex-row">
            <Support height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold dark:text-white">Contact Jam Support</Text>
          </View>
        </Pressable>

        {/* Delete account */}
        <Pressable testID="DeleteButton" onPress={handleDeleteAccount} className="mx-6 my-4 flex-row justify-between">
          <View className="flex-row">
            <Attention width="24px" height="24px" pathFill={colors.gray[3]} />
            <Text className="ml-4 text-base font-sans-bold text-gray-3">Delete Account</Text>
          </View>
        </Pressable>

        {/* Sign Out */}
        <Pressable
          testID="LogoutButton"
          onPress={() =>
            Alert.alert(
              'Are you sure?',
              'Are you sure you want to sign out?',
              [
                {
                  text: 'Sign Out',
                  onPress: () => handleLogout(),
                  style: 'destructive',
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ],
              { cancelable: true },
            )
          }
          className="mx-6 my-4 flex-row justify-between"
        >
          <View className="flex-row">
            <SignOut svgStroke={colors.gray[3]} height="24px" width="24px" />
            <Text className="ml-4 text-base font-sans-bold text-gray-3">Sign Out</Text>
          </View>
        </Pressable>

        {/* Developer */}
        {user?.is_admin && (
          <Pressable testID="LogoutButton" onPress={gotoDeveloper} className="mx-6 my-4 flex-row justify-between">
            <View className="flex-row">
              <Like svgStroke={colors.dragonfruit[1]} height="24px" width="24px" />
              <Text className="ml-4 text-base font-sans-bold text-dragonfruit-1">Developer</Text>
            </View>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
