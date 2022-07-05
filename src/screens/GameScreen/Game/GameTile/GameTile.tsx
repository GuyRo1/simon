import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {useAppSelector} from '../../../../store/hooks';

type Props = {
  index: number;
  buttonColor: string;
  init: boolean;
  inputHandler: (index: number) => void;
};

const GameTile = ({index, buttonColor, inputHandler, init}: Props) => {
  const {endGameStatus, highlight, phase} = useAppSelector(
    state => state.gameData,
  );
  const borderStyle = (current: any) =>
    current === endGameStatus
      ? styles.errorBorder
      : current === highlight
      ? styles.activeBorder
      : phase === 'machine'
      ? styles.computerBorder
      : styles.humanBorder;

  const handlePress = () => {
    if (highlight === null) {
      inputHandler(index);
    }
  };

  return (
    <View style={[styles.buttonContainer, borderStyle(index)]}>
      <Pressable
        disabled={!init}
        onPress={handlePress}
        style={[styles.button, {backgroundColor: buttonColor}]}
      />
    </View>
  );
};

export default GameTile;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 2 / 3,
    width: 330,
    borderRadius: 10,
  },
  humanBorder: {
    backgroundColor: 'white',
  },
  computerBorder: {
    backgroundColor: '#bfbcbb',
  },
  activeBorder: {
    backgroundColor: '#87fd05',
  },
  errorBorder: {
    backgroundColor: 'pink',
  },
});
