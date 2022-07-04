import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Header from './Header/Header';
import Game from './Game/Game';

type Props = {
  route: any;
};

const GameScreen = ({route}: Props) => {
  const [score, setScore] = useState<number>(0);
  const [game, setGame] = useState<boolean>(false);
  const [playerIcon, setPlayerIcon] = useState<string>('');

  const restart = route?.params?.seed;

  const startGame = (): void => {
    if (!game) {
      setGame(true);
    }
  };

  return (
    <>
      <Header playerIcon={playerIcon} action={startGame} score={score} />

      <View style={styles.gameContainer}>
        <Game
          setPlayerIcon={setPlayerIcon}
          restart={restart}
          init={game}
          setScore={setScore}
        />
      </View>
    </>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  gameContainer: {
    flex: 8,
  },
});
