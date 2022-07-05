import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Modal} from 'react-native';

import useGameLogic from '../../../hooks/useGameLogic';

import EndGameModal from './../EndGameModal/EndGameModal';
import GameTile from './GameTile/GameTile';

import {constants} from './../../../styles/constants';
import {soundsContext} from './../../../context/soundContext';

const gameButtons = [
  constants.simonBlue,
  constants.simonRed,
  constants.simonGreen,
  constants.simonYellow,
];

type Props = {
  setScore: Function;
  init: boolean;
  setPlayerIcon: any;
  restart: boolean;
};

const Game = ({init, setScore, setPlayerIcon, restart}: Props) => {
  const sounds = useContext(soundsContext);
  const {inputHandler, score, highlight, start, endGameStatus, phase, reset} =
    useGameLogic(sounds);

  const [endGameModal, setEndGameModal] = useState(false);

  useEffect(() => {
    if (restart !== null && restart !== undefined) {
      setEndGameModal(false);
      reset();
    }
  }, [reset, restart]);

  useEffect(() => {
    setPlayerIcon(phase);
  }, [phase, setPlayerIcon]);

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

  useEffect(() => {
    if (score >= 0) {
      setScore(score);
    }
  }, [score, setScore]);

  return (
    <>
      <Modal animationType="slide" visible={endGameModal}>
        <EndGameModal score={score} />
      </Modal>

      <View style={styles.container}>
        {gameButtons.map((buttonColor, index) => (
          <GameTile
            phase={phase}
            init={init}
            key={index}
            index={index}
            buttonColor={buttonColor}
            endGameStatus={endGameStatus}
            highlight={highlight}
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
