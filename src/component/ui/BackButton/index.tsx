import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Color} from 'src/utils';
import styles from './style';

interface BackButtonProps {
  onPress: () => void;
  bgColor?: string;
}

const BackButton = ({onPress, bgColor = Color.WHITE}: BackButtonProps) => (
    <View style={[styles.container, bgColor]}>
      <Icon name="chevron-back" size={30} color="#000" />
    </View>
  );

export default BackButton;
