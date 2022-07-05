import Sound from 'react-native-sound';

export type SoundType = Sound;

export const getSounds = () => {
  const createSound = (sound: string) => {
    return new Sound(sound, Sound.MAIN_BUNDLE, error => {
      error
        ? console.error(error)
        : console.log('music files where loaded to app');
    });
  };

  Sound.setCategory('Playback');
  let [good, bad] = ['good.wav', 'bad.wav'].map(createSound);
  return {good, bad};
};
