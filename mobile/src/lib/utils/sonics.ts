import Sound from 'react-native-sound';

export function initializeSonics() {
  Sound.setCategory('Playback');
}

export const start = new Sound('start.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.error('failed to load the start sonic', error);
  }
});

export const next = new Sound('next.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.error('failed to load the next sonic', error);
  }
});

export const end = new Sound('end.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.error('failed to load the end sonic', error);
  }
});
