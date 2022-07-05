import React from 'react';
import {AppSound, soundsContext} from './../context/soundContext';
import {useEffect, useState} from 'react';
import {getSounds} from '../sounds/sounds';

const SoundContextProvider = ({children}: {children: React.ReactNode}) => {
  const [sounds, setSounds] = useState<AppSound>({
    good: {play: () => {}},
    bad: {play: () => {}},
  });
  useEffect(() => {
    const loadedSounds = getSounds();
    if (loadedSounds) {
      setSounds(loadedSounds);
    }
  }, []);

  return (
    <soundsContext.Provider value={{good: sounds.good, bad: sounds.bad}}>
      {children}
    </soundsContext.Provider>
  );
};

export default SoundContextProvider;
