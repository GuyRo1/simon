import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, Modal} from 'react-native';
import useGameLogic from '../../../hooks/useGameLogic';
import EndGameModal from './../EndGameModal/EndGameModal';

const gameButtons = ['green', 'red', 'blue', 'yellow'];

type GameProps = {
  setScore: Function;
  init: boolean;
  setPlayerIcon: any;
};

const Game = ({init, setScore, setPlayerIcon}: GameProps) => {
  const {inputHandler, score, highlight, start, endGameStatus, phase} =
    useGameLogic();
  const [pending, setPending] = useState<number | null>(0);
  const [endGameModal, setEndGameModal] = useState(false);

  useEffect(() => {
    setPlayerIcon(phase);
  }, [phase, setPlayerIcon]);

  useEffect(() => {
    console.log('was game ended ' + endGameModal);
  }, [endGameModal]);

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
    if (pending === 0) {
      delay = setTimeout(() => {
        setPending(1);
      }, 1000);
    }
    if (pending === 1) {
      delay = setTimeout(() => {
        setPending(2);
      }, 1000);
    }
    if (pending === 2) {
      delay = setTimeout(() => {
        start();
      }, 1000);
    }
    return () => {
      clearTimeout(delay);
    };
  }, [init, pending, start]);

  useEffect(() => {
    if (score >= 0) {
      setScore(score);
    }
  }, [score, setScore]);

  const borderStyle = (current: any) =>
    pending === 1
      ? styles.pendingBorder
      : current === endGameStatus
      ? styles.errorBorder
      : current === highlight
      ? styles.activeBorder
      : styles.border;

  return (
    <>
      <Modal
        animationType="slide"
        visible={endGameStatus === null ? false : true}>
        <EndGameModal score={score} />
      </Modal>
      <View style={styles.container}>
        {gameButtons.map((button, index) => (
          <View
            key={index}
            style={[styles.buttonContainer, borderStyle(index)]}>
            <Pressable
              disabled={pending !== 2}
              onPress={() => {
                if (highlight === null) {
                  inputHandler(index);
                }
              }}
              style={[styles.button, {backgroundColor: button}]}
            />
          </View>
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
  border: {
    backgroundColor: 'grey',
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
