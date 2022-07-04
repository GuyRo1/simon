import React from 'react';
import {FlatList, Text, StyleSheet, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../../store/hooks';

import ScoreItem from './ScoreItem/ScoreItem';

import {Score} from '../../models/scoreModel';
import {generateUUID} from '../../utils/uuid';

const ScoreScreen = () => {
  const navigator = useNavigation();

  const data = useAppSelector(state => state.bestScores.list);

  const navHomeAndStartGame = () => {
    navigator.navigate('main', {seed: generateUUID(20)});
  };

  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          contentContainerStyle={styles.dataContainer}
          keyExtractor={(item, _) => item.id}
          data={data}
          renderItem={({item}: {item: Score}) => (
            <ScoreItem key={item.id} item={item} />
          )}
        />
      )}

      <Pressable onPress={navHomeAndStartGame} style={styles.button}>
        <Text style={styles.buttonText}>Start New Game</Text>
      </Pressable>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 30,
  },
  dataContainer: {
    flex: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'green',
  },
  button: {
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
});
