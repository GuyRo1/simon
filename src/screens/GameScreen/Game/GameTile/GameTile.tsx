import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

type Props = {
  index: number;
  buttonColor: string;

  endGameStatus: number | null;
  highlight: number | null;
  init: boolean;
  inputHandler: (index: number) => void;
};

const GameTile = ({
  index,
  buttonColor,
  endGameStatus,
  highlight,
  inputHandler,
  init,
}: Props) => {
  const borderStyle = (current: any) =>
    current === endGameStatus
      ? styles.errorBorder
      : current === highlight
      ? styles.activeBorder
      : styles.border;

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
    borderWidth: 0.1,
    borderRadius: 10,
    opacity: 1,
  },
  border: {
    backgroundColor: 'white',
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
