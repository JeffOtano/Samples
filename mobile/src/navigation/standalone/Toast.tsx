import React, { useCallback, useEffect, useState } from 'react';
import { Text, DeviceEventEmitter, Pressable } from 'react-native';
import styled from 'styled-components/native';

import { sleep } from '@jam/utils';

import colors from '../../../colors';

const ToastBox = styled(Pressable)<{ toastType: string }>`
  position: absolute;
  z-index: 10;
  height: 40px;
  justify-content: center;
  top: 5%;
  right: 24px;
  bottom: 24px;
  left: 24px;
  border-radius: 8px;
  vertical-align: middle;
  background-color: ${({ toastType }) => {
    if (toastType === 'success') return colors.lime[2];
    if (toastType === 'info') return colors.plum[3];
    return colors.strawberry[2];
  }};
`;

const ToastText = styled(Text)<{ toastType: string }>`
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  line-height: 16.8px;
  font-family: 'Lato-Bold';
  color: ${({ toastType }) => {
    if (toastType === 'success') return colors.lime[1];
    if (toastType === 'info') return colors.plum[1];
    return colors.strawberry[1];
  }};
`;

function Toast() {
  const [toastData, setToastData] = useState({ message: '', type: '', duration: 0 });
  const [showToast, setShowToast] = useState(false);

  const closeToast = useCallback(() => {
    setShowToast(false);
    setToastData({ message: '', type: '', duration: 0 });
  }, []);

  const onNewToast = useCallback(
    async ({ duration, durationOverride, message = 'Success!', type = 'success' }) => {
      setToastData({ duration: durationOverride || duration, message, type });
      setShowToast(true);
      await sleep(duration || durationOverride);
      closeToast();
    },
    [closeToast],
  );

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('SHOW_TOAST', onNewToast);
    return () => {
      subscription.remove();
    };
  }, [onNewToast]);

  return (
    showToast && (
      <ToastBox toastType={toastData.type} onPress={closeToast}>
        <ToastText toastType={toastData.type}>{toastData.message}</ToastText>
      </ToastBox>
    )
  );
}

export default Toast;
