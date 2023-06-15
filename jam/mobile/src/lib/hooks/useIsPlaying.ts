import { useEffect, useState } from 'react';
import TrackPlayer, { Event, State } from 'react-native-track-player';

const useIsPlaying = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const updatePlayingState = async () => {
      try {
        const state = await TrackPlayer.getState();
        setIsPlaying(state === State.Playing);
      } catch (error) {
        if (error.code === 'player_not_initialized') {
          // We can ignore this error, this hook is called on initial render of ListenHomeScreen
          // and the player is not initialized yet.
        } else {
          console.error(error);
        }
      }
    };

    updatePlayingState();
  }, []);

  useEffect(() => {
    const playbackStateSubscription = TrackPlayer.addEventListener(Event.PlaybackState, async (playbackState) => {
      switch (playbackState.state) {
        case State.Playing:
          setIsPlaying(true);
          break;
        case State.Paused:
        case State.Stopped:
        case State.None:
        case State.Ready:
          setIsPlaying(false);
        // no default
      }
    });
    return () => {
      playbackStateSubscription.remove();
    };
  }, []);

  return isPlaying;
};

export default useIsPlaying;
