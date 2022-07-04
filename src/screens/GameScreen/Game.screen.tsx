import Game from './Game/Game';
import {View} from 'react-native';
import React, {useState, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {incremented, amountAdded} from '../../store/slices/counter.slice';

import Header from './Header/Header';
const GameScreen = () => {
  const [score, setScore] = useState<number>(0);
  const [game, setGame] = useState<boolean>(false);
  const [playerIcon, setPlayerIcon] = useState<string | null>(null);
  const value = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(incremented());
    dispatch(amountAdded(5));
  }, []);

  return (
    <>
      <Header
        playerIcon={playerIcon}
        action={() => {
          if (!game) {
            setGame(true);
          }
        }}
        score={score}
      />

      <View style={{flex: 8}}>
        <Game setPlayerIcon={setPlayerIcon} init={game} setScore={setScore} />
      </View>
    </>
  );
};

export default GameScreen;
