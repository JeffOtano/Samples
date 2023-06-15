import { AppRegistry } from 'react-native';
import Config from 'react-native-config';
import OneSignal from 'react-native-onesignal';
import TrackPlayer from 'react-native-track-player';
import App from './app/App';
import PlaybackService from './services/playback-service';

AppRegistry.registerComponent('Mobile', () => App);
OneSignal.setAppId(Config.ONESIGNAL_APP_ID);
TrackPlayer.registerPlaybackService(() => PlaybackService);

// Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(null);
});
