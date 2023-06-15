import ApiClient from '@jam/api-client';
import { PlaylistSegment, TrackingData, TrackingEvent } from '@jam/api-models';
import { State } from 'react-native-track-player';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export async function trackUserEvent(event: TrackingEvent, eventData: TrackingData = {}) {
  const decoratedData = {
    platform: 'mobile',
    os: Platform.OS,
    platformVersion: Platform.Version,
    appVersion: DeviceInfo.getReadableVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    ...eventData,
  };
  const trackingData = {
    event,
    eventData: decoratedData,
    clientTs: new Date(),
  };

  try {
    await ApiClient.post('/api/tracking-events', trackingData);
  } catch (error) {
    console.error(`Error posting tracking event`, trackingData, error);
  }
}

export async function trackCurrentSegmentEvent(
  trackingEvent: TrackingEvent,
  segment: PlaylistSegment,
  position: number,
  addlData?: TrackingData,
) {
  await trackUserEvent(trackingEvent, {
    segmentId: segment.id,
    fileUrl: segment.playbackUrl,
    duration: segment.duration,
    currentTime: position,
    ...addlData,
  });
}

export function trackPlayerStateToSystem(trackPlayerEvent: State): TrackingEvent | null {
  if (trackPlayerEvent === State.Playing) {
    return 'play';
  }
  if (trackPlayerEvent === State.Paused) {
    return 'pause';
  }
  if (trackPlayerEvent === State.Stopped) {
    return 'pause';
  }

  return null;
}
