/* eslint-disable react/jsx-props-no-spreading */
import { useUser } from '@jam/api-client';
import React from 'react';
import { Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Config from 'react-native-config';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DevText = styled(Text)`
  font-size: 24px;
  line-height: 28.8px;
  font-family: 'Lato-Regular';
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text.heading};
`;

const DevView = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.background.primary};
  justify-content: center;
  align-items: flex-start;
  padding-left: 4px;
`;

export default function DeveloperScreen() {
  const { data: user } = useUser();

  return (
    <DevView>
      <DevText>ID: {user?.id}</DevText>
      <DevText>IOS_APP_ID: {Config.IOS_APP_ID}</DevText>
      <DevText>API_ROOT: {Config.API_ROOT}</DevText>
      <DevText>APP_VERSION: {DeviceInfo.getVersion()}</DevText>
      <DevText>BUILD_NUMBER: {DeviceInfo.getBuildNumber()}</DevText>
    </DevView>
  );
}
