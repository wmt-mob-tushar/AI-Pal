import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  ImageProps,
} from 'react-native';
import Icon from '../icon';
import {icons} from '../../assets';
import styles, {HEIGHT} from './styles';

interface BaseToastProps {
  color: string;
  icon?: ImageProps; // Replace 'any' with the appropriate type for your Icon component
  text1?: string;
  text2?: string;
  onClose?: () => void;
}

const BaseToast: React.FC<BaseToastProps> = props => {
  const {color, icon, text1, text2, onClose} = props;
  const baseStyle = [styles.base, styles.borderLeft, {borderLeftColor: color}];
  return (
    <View style={baseStyle}>
      <View style={styles.iconContainer}>
        {icon ? (
          <Icon style={styles.icon} source={icon} />
        ) : (
          <View style={styles.icon} />
        )}
      </View>

      <View style={styles.contentContainer}>
        <View>
          {text1 !== undefined && (
            <View>
              <Text style={styles.text1} numberOfLines={0}>
                {text1}
              </Text>
            </View>
          )}
          {text2 !== undefined && (
            <View>
              <Text style={styles.text2} numberOfLines={0}>
                {text2}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
/* Remove comment if necessary */
// BaseToast.HEIGHT = HEIGHT;
export default BaseToast;
