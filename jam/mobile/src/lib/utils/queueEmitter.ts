import { DeviceEventEmitter } from 'react-native';

export const QUEUE_UPDATED = 'QUEUE_UPDATED';

export const queueEmitter = {
  updated: () => {
    DeviceEventEmitter.emit(QUEUE_UPDATED);
  },
};
