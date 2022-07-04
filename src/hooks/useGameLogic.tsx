import {useState, useEffect, useRef, useCallback} from 'react';

const useGameLogic = () => {
  const gameData = useRef<any>({
    index: 0,
    path: [],
    inputEnabled: false,
  });

  const [endGame, setEndGame] = useState<number | null>(null);
  const [score, setScore] = useState<number>(-1);
  const [phase, setPhase] = useState<string>('pending');
  const [highlight, setHighLight] = useState<number | null>(null);
  const [next, setNext] = useState<boolean>(false);
  const bumpScore = () => {
    setScore(prevScore => prevScore + 1);
  };

  const addRandomToPath = () => {
    gameData.current.path = gameData.current.path.concat(
      Math.floor(Math.random() * 4),
    );
  };

  const reset = useCallback(() => {
    setScore(-1);
    setHighLight(null);
    setNext(false);
    setPhase('machine');
    setEndGame(null);
    gameData.current = {
      index: 0,
      path: [],
      inputEnabled: false,
    };
  }, []);

  useEffect(() => {
    if (next) {
      if (gameData.current.index < gameData.current.path.length) {
        setHighLight(gameData.current.path[gameData.current.index]);
        setNext(false);
      } else {
        setNext(false);

        gameData.current.index = 0;
        setPhase(prevPhase => (prevPhase === 'human' ? 'machine' : 'human'));
      }
    }
  }, [next]);

  useEffect(() => {
    let fade: null | number;
    if (highlight !== null) {
      fade = setTimeout(() => {
        setHighLight(null);
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
  }, [highlight, phase]);

  useEffect(() => {
    if (phase === 'machine') {
      bumpScore();
    }
  }, [phase]);

  const inputHandler = (input: number) => {
    if (gameData.current.inputEnabled) {
      if (input === gameData.current.path[gameData.current.index]) {
        //TODO good sound
        setNext(true);
      } else {
        //TODO bad sound
        setPhase('pending');
        setEndGame(input);
      }
    }
  };

  const start = useCallback(() => {
    setPhase('machine');
  }, []);

  return {
    inputHandler,
    start,
    endGameStatus: endGame,
    score,
    highlight,
    phase,
    reset,
  };
};

export default useGameLogic;
