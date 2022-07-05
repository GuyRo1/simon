import Sound from 'react-native-sound';

const createSound = (sound: string) => {
  return new Sound(sound, Sound.MAIN_BUNDLE, error => {
    error ? console.error(error) : console.log(':)');
  });
};

Sound.setCategory('Playback');
let [good, bad] = ['good.wav', 'bad.wav'].map(createSound);

export default {good, bad};
