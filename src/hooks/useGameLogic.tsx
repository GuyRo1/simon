import {useState, useEffect, useRef, useCallback} from 'react';
import {AppSound} from '../context/soundContext';
import {useAppSelector} from '../store/hooks';
import {
  gameDataState,
  reset as resetGame,
  setHighLight,
  setPhase,
  setEndGameStatus,
  bumpScore,
} from './../store/slices/gameSlice';
import {useAppDispatch} from './../store/hooks';

const useGameLogic = (sounds: AppSound) => {
  const gameData = useRef<any>({
    index: 0,
    path: [],
    inputEnabled: false,
  });
  const {phase, highlight}: gameDataState = useAppSelector(
    state => state.gameData,
  );
  const dispatch = useAppDispatch();

  const [next, setNext] = useState<boolean>(false);

  const addRandomToPath = () => {
    gameData.current.path = gameData.current.path.concat(
      Math.floor(Math.random() * 4),
    );
  };

  const reset = useCallback(() => {
    dispatch(resetGame());
    setNext(false);
    gameData.current = {
      index: 0,
      path: [],
      inputEnabled: false,
    };
  }, []);

  useEffect(() => {
    if (next) {
      if (gameData.current.index < gameData.current.path.length) {
        sounds.good.play();
        dispatch(setHighLight(gameData.current.path[gameData.current.index]));
        setNext(false);
      } else {
        setNext(false);

        gameData.current.index = 0;
        dispatch(setPhase(phase === 'human' ? 'machine' : 'human'));
      }
    }
  }, [next]);

  useEffect(() => {
    let fade: null | number;
    if (highlight !== null) {
      fade = setTimeout(() => {
        dispatch(setHighLight(null));
        gameData.current.index++;
        if (
          phase === 'machine' ||
          gameData.current.index === gameData.current.path.length
        ) {
          setNext(true);
        }
      }, 1400);
    } else {
      if (phase === 'machine') {
        if (gameData.current.index === 0) {
          gameData.current.inputEnabled = false;
          addRandomToPath();
          setNext(true);
        }
      } else if (phase === 'human') {
        if (gameData.current.index === 0) {
          gameData.current.inputEnabled = true;
        }
      }
    }

    return () => {
      if (fade) {
        clearTimeout(fade);
      }
    };
  }, [highlight, phase, dispatch]);

  useEffect(() => {
    if (phase === 'machine') {
      dispatch(bumpScore());
    }
  }, [phase, dispatch]);

  const inputHandler = (input: number) => {
    if (gameData.current.inputEnabled) {
      if (input === gameData.current.path[gameData.current.index]) {
        setNext(true);
      } else {
        sounds.bad.play();
        dispatch(setPhase('pending'));
        dispatch(setEndGameStatus(input));
      }
    }
  };

  const start = useCallback(() => {
    dispatch(setPhase('machine'));
  }, []);

  return {
    inputHandler,
    start,
    reset,
  };
};

export default useGameLogic;
