import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAppDispatch, useAppSelector} from './../../../store/hooks';
import {addScore} from '../../../store/slices/bestScoresSlice';

import {Score} from '../../../models/scoreModel';
import {config} from './../../../config/config';
import {useNavigation} from '@react-navigation/native';
import {generateUUID} from './../../../utils/uuid';

type Props = {
  score: number;
};

const EndGameModal = ({score}: Props) => {
  const navigator = useNavigation();

  const [input, setInput] = useState<string>('');

  const bestScoresState = useAppSelector(state => state.bestScores.list);
  const dispatch = useAppDispatch();

  const updateScores = () => {
    let sortedData: Score[] = [...bestScoresState];
    sortedData = sortedData.sort((a: Score, b: Score) => a.score - b.score);

    if (sortedData.length < 10 || score > sortedData[0].score) {
      const newScoreRecord = {
        name: input,
        score,
        id: generateUUID(32),
      };
      sortedData.push(newScoreRecord);

      dispatch(
        addScore(sortedData.sort((a: Score, b: Score) => b.score - a.score)),
      );

      AsyncStorage.setItem(config.bestScoresKey, JSON.stringify(sortedData));
    }
    navigator.navigate('topTen');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{`Your score is: ${score}`}</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Input your Name"
          blurOnSubmit={true}
          onSubmitEditing={updateScores}
          onChangeText={setInput}
          value={input}
        />
      </View>
    </View>
  );
};

export default EndGameModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 36,
  },
  input: {color: 'white', fontSize: 36},
});
