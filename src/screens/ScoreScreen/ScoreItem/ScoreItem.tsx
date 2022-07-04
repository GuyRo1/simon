import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {Score} from '../../../models/scoreModel';

type Props = {
  item: Score;
};

const ScoreItem = ({item}: Props) => {
  return (
    <Text
      style={styles.text}>{`Name: ${item.name} - Score: ${item.score}`}</Text>
  );
};

export default ScoreItem;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 24,
  },
});
