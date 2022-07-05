import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Robot from 'react-native-vector-icons/FontAwesome5';
import Human from 'react-native-vector-icons/MaterialCommunityIcons';
import Neutral from 'react-native-vector-icons/Feather';

import {constants} from '../../../styles/constants';
import {useAppSelector} from '../../../store/hooks';

const selectIcon = (playerData: string) => {
  switch (playerData) {
    case 'machine':
      return <Robot name="robot" size={30} color="white" />;

    case 'human':
      return <Human name="human" size={30} color="white" />;

    default:
      return <Neutral name="more-horizontal" size={30} color="white" />;
  }
};

type Props = {
  action: () => void;
};

const Header = ({action}: Props) => {
  const {phase, score} = useAppSelector(state => state.gameData);

  return (
    <View style={styles.header}>
      <View style={styles.section}>
        <Text style={styles.text}>{`Score ${score >= 0 ? score : 0}`}</Text>
      </View>

      <View style={[styles.section, styles.iconContainer]}>
        {selectIcon(phase)}
      </View>

      <Pressable onPress={action} style={styles.section}>
        <Text style={styles.text}>
          <Text style={{color: constants.simonRed}}>S</Text>
          <Text style={{color: constants.simonYellow}}>T</Text>
          <Text style={{color: constants.simonGreen}}>A</Text>
          <Text style={{color: constants.simonBlue}}>R</Text>
          <Text style={{color: 'white'}}>T</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 36,
    color: 'white',
  },
  section: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
