import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';

import useGameLogic from '../../../hooks/useGameLogic';

import EndGameModal from './../EndGameModal/EndGameModal';
import GameTile from './GameTile/GameTile';

import {constants} from './../../../styles/constants';
import {soundsContext} from './../../../context/soundContext';
import {useAppSelector} from '../../../store/hooks';

const gameButtons = [
  constants.simonBlue,
  constants.simonRed,
  constants.simonGreen,
  constants.simonYellow,
];

type Props = {
  setScore: Function;
  init: boolean;
  restart: boolean;
};

const Game = ({init, restart}: Props) => {
  const sounds = useContext(soundsContext);
  const {inputHandler, start, reset} = useGameLogic(sounds);
  const [endGameModal, setEndGameModal] = useState(false);
  const {endGameStatus, score} = useAppSelector(state => state.gameData);

  useEffect(() => {
    if (restart !== null && restart !== undefined) {
      setEndGameModal(false);
      reset();
    }
  }, [reset, restart]);

  useEffect(() => {
    if (endGameStatus !== null) {
      setEndGameModal(true);
    }
  }, [endGameStatus]);

  useEffect(() => {
    let delay: number;
    if (!init) {
      return;
    }

    delay = setTimeout(() => {
      start();
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, [init, start]);

  return (
    <>
      <Modal animationType="slide" visible={endGameModal}>
        <EndGameModal score={score} />
      </Modal>

      <View style={styles.container}>
        {gameButtons.map((buttonColor, index) => (
          <GameTile
            init={init}
            key={index}
            index={index}
            buttonColor={buttonColor}
            inputHandler={inputHandler}
          />
        ))}
      </View>
    </>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {flex: 1},
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 2 / 3,
    width: 330,
    borderWidth: 0.1,
    borderRadius: 10,
    opacity: 1,
  },
  activeBorder: {
    backgroundColor: '#87fd05',
  },
  errorBorder: {
    backgroundColor: 'pink',
  },
  pendingBorder: {
    backgroundColor: 'orange',
  },
});
