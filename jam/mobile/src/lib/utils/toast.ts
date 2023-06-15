import { DeviceEventEmitter } from 'react-native';

import { TOAST_DURATIONS } from '@jam/utils';

const toast = {
  info: (options) => {
    DeviceEventEmitter.emit('SHOW_TOAST', { ...options, type: 'info', duration: TOAST_DURATIONS.info });
  },
  success: (options) => {
    DeviceEventEmitter.emit('SHOW_TOAST', { ...options, type: 'success', duration: TOAST_DURATIONS.success });
  },
  danger: (options) => {
    DeviceEventEmitter.emit('SHOW_TOAST', { ...options, type: 'danger', duration: TOAST_DURATIONS.danger });
  },
};

export default toast;
