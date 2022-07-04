import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

type EndGameModalProps = {
  score: number;
};

const EndGameModal = ({score}: EndGameModalProps) => {
  const [input, setInput] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 36,
          }}>{`Your score is: ${score}`}</Text>
      </View>
      <View>
        <TextInput
          style={{color: 'white', fontSize: 36}}
          placeholderTextColor="white"
          placeholder="Input your Name"
          blurOnSubmit={true}
          onSubmitEditing={() => {}}
          onChangeText={setInput}
          value={input}
        />
      </View>
    </View>
  );
};

export default EndGameModal;
