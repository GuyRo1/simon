import {createContext} from 'react';
import {SoundType} from '../sounds/sounds';

type Mock = {
  play: () => void;
};

type Sounds = {
  good: SoundType;
  bad: SoundType;
};

export type InitStateType = {
  good: Mock;
  bad: Mock;
};

export type AppSound = InitStateType | Sounds;

export const soundsContext = createContext<AppSound>({
  good: {play: () => {}},
  bad: {play: () => {}},
});
