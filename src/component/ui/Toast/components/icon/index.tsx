import React from 'react';
import {Image, ImageProps, ImageStyle, StyleProp} from 'react-native';
import styles from './styles';

interface IconProps {
  source?: ImageProps;
  style?: StyleProp<ImageStyle>;
}

const Icon: React.FC<IconProps> = props => {
  const {source, style} = props;
  if (!source) {
    return null;
  }
  return (
    <Image source={source} style={[styles.base, style]} resizeMode="contain" />
  );
};
export default Icon;
