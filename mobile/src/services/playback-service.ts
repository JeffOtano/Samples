import TrackPlayer, { Event, State } from 'react-native-track-player';
import playerSkip from '../components/player/utils/playerSkip';
import { next, start } from '../lib/utils/sonics';

let wasPausedByDuck = false;

const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, async () => {
    try {
      start.play(async () => {
        await TrackPlayer.play();
      });
    } catch (error) {
      console.error(error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePause, async () => {
    try {
      await TrackPlayer.pause();
    } catch (error) {
      console.error(error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    try {
      await TrackPlayer.pause();
      next.play(async () => {
        await playerSkip();
      });
    } catch (error) {
      console.error(error);
    }
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.error(error);
    }
  });

  TrackPlayer.addEventListener(Event.RemoteDuck, async (event) => {
    try {
      if (event.permanent === true) {
        await TrackPlayer.pause();
      } else if (event.paused === true) {
        const playerState = await TrackPlayer.getState();
        wasPausedByDuck = playerState !== State.Paused;
        await TrackPlayer.pause();
      } else if (wasPausedByDuck === true) {
        await TrackPlayer.play();
        wasPausedByDuck = false;
      }
    } catch (error) {
      console.error(error);
    }
  });
};

export default PlaybackService;
