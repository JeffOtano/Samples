import { Alert } from 'react-native';
import { trackUserEvent } from '../tracking';

export default async function showSubsMessage({
  variant,
  segmentId,
  streamId,
}: {
  variant: 'follow' | 'unfollow' | 'play';
  segmentId?: string;
  streamId?: string;
}) {
  const message =
    variant === 'follow' || variant === 'play'
      ? 'We can‘t add paid Jams to your playlist in the mobile app. We‘re sorry.'
      : 'We can‘t remove paid Jams from your playlist in the mobile app. We‘re sorry.';

  Alert.alert(message);

  await trackUserEvent('mobileSubscriptionAlert', {
    streamId,
    segmentId,
    message,
  });
}
