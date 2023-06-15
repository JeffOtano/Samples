import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View, useColorScheme } from 'react-native';
import ApiClient, { useUserAggregation } from '@jam/api-client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { mutate } from 'swr';

import { AVAILABLE_TIMES, INITIAL_DELIVERY_TIME } from '@jam/utils';

import styled from 'styled-components/native';
import toast from '../../../lib/utils/toast';
import colors from '../../../../colors';
import { Checkmark } from '../../../components/icons';

const CheckmarkIconOuter = styled(View)<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
`;

function DeliveryTime() {
  const { data: userAggregation } = useUserAggregation();
  const [currentDeliveryTime, setCurrentDeliveryTime] = useState(INITIAL_DELIVERY_TIME);
  const isDarkMode = useColorScheme() === 'dark';

  const readableTimeZone = userAggregation?.timezone.replace('_', ' ');

  const handleDeliveryTime = useCallback(
    async (newDeliveryTime) => {
      try {
        await ApiClient.put(`/api/users/me/user-aggregation`, {
          duration: userAggregation?.duration,
          timezone: userAggregation?.timezone,
          delivery: String(newDeliveryTime),
        });
        mutate(`/api/users/me/user-aggregation`);
      } catch (error) {
        // TODO https://github.com/altoindustries/jam/issues/174
        console.error('Failed to update delivery time');
        toast.danger({ message: 'Failed to update delivery time. Try again.' });
        setCurrentDeliveryTime(userAggregation?.hour_local);
      }
    },
    [userAggregation],
  );

  useEffect(() => {
    setCurrentDeliveryTime(userAggregation?.hour_local || INITIAL_DELIVERY_TIME);
  }, [userAggregation]);

  const allMorningTimes = AVAILABLE_TIMES.morning.map((time) => (
    <Pressable
      key={`${time.id}-morning`}
      onPress={() => {
        setCurrentDeliveryTime(time.id);
        handleDeliveryTime(time.id);
      }}
      className="mr-6 flex flex-row justify-between items-center mt-4 mb-5"
    >
      <Text className="dark:text-white text-base font-sans-normal">{time.string}</Text>
      <CheckmarkIconOuter hidden={currentDeliveryTime !== time.id}>
        <Checkmark height="24px" width="24px" svgStroke={isDarkMode ? colors.dragonfruit[1] : colors.plum[1]} />
      </CheckmarkIconOuter>
    </Pressable>
  ));

  const allAfternoonTimes = AVAILABLE_TIMES.afternoon.map((time) => (
    <Pressable
      key={`${time.id}-morning`}
      onPress={() => {
        setCurrentDeliveryTime(time.id);
        handleDeliveryTime(time.id);
      }}
      className="mr-6 flex flex-row justify-between items-center mt-4 mb-5"
    >
      <Text className="dark:text-white text-base font-sans-normal">{time.string}</Text>
      <CheckmarkIconOuter hidden={currentDeliveryTime !== time.id}>
        <Checkmark height="24px" width="24px" svgStroke={isDarkMode ? colors.dragonfruit[1] : colors.plum[1]} />
      </CheckmarkIconOuter>
    </Pressable>
  ));

  const allEveningTimes = AVAILABLE_TIMES.evening.map((time) => (
    <Pressable
      key={`${time.id}-morning`}
      onPress={() => {
        setCurrentDeliveryTime(time.id);
        handleDeliveryTime(time.id);
      }}
      className="mr-6 flex flex-row justify-between items-center mt-4 mb-5"
    >
      <Text className="dark:text-white text-base font-sans-normal">{time.string}</Text>
      <CheckmarkIconOuter hidden={currentDeliveryTime !== time.id}>
        <Checkmark height="24px" width="24px" svgStroke={isDarkMode ? colors.dragonfruit[1] : colors.plum[1]} />
      </CheckmarkIconOuter>
    </Pressable>
  ));

  const allNightTimes = AVAILABLE_TIMES.night.map((time) => (
    <Pressable
      key={`${time.id}-morning`}
      onPress={() => {
        setCurrentDeliveryTime(time.id);
        handleDeliveryTime(time.id);
      }}
      className="mr-6 flex flex-row justify-between items-center mt-4 mb-5"
    >
      <Text className="dark:text-white text-base font-sans-normal">{time.string}</Text>
      <CheckmarkIconOuter hidden={currentDeliveryTime !== time.id}>
        <Checkmark height="24px" width="24px" svgStroke={isDarkMode ? colors.dragonfruit[1] : colors.plum[1]} />
      </CheckmarkIconOuter>
    </Pressable>
  ));

  return (
    <SafeAreaView className="dark:bg-black-0">
      <ScrollView className="ml-6">
        <>
          <View className="mb-6 flex flex-row">
            <Text className="font-base font-sans-normal text-gray-2 mr-2">{readableTimeZone}</Text>
          </View>
          <Text className="font-sans-bold text-xl mb-3 dark:text-white">Morning</Text>
          {allMorningTimes}
          <Text className="font-sans-bold text-xl mb-3 dark:text-white">Afternoon</Text>
          {allAfternoonTimes}
          <Text className="font-sans-bold text-xl mb-3 dark:text-white">Evening</Text>
          {allEveningTimes}
          <Text className="font-sans-bold text-xl mb-3 dark:text-white">Night</Text>
          {allNightTimes}
        </>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DeliveryTime;
