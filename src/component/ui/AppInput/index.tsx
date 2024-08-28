import React, {useState} from 'react';
import {View} from 'react-native';
import {
  FilledTextField,
  OutlinedTextField,
  TextField,
} from 'rn-material-ui-textfield';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {ThemeUtils} from 'src/utils';
import {Label} from 'src/component';
import styles from './styles';

interface AppInputProps {
  icEyeColor?: string;
  filled?: boolean;
  outlined?: boolean;
  outlinedLabel?: boolean;
  tintColor?: string;
  label?: string;
  secureTextEntry?: boolean;
  baseColor?: string;
  onFocus?: () => void;
  error?: string;
  value?: string;
  onBlur?: () => void;
  onChangeText?: () => void;
}

const AppInput: React.FC<AppInputProps> = (props: AppInputProps) => {
  const {
    icEyeColor,
    filled,
    label,
    outlinedLabel,
    outlined,
    secureTextEntry,
    baseColor,
    tintColor,
  } = props;
  const [passwordVisible, setPasswordVisible] = useState(secureTextEntry);
  let InputComponent: any = TextField;
  if (filled || outlinedLabel) {
    InputComponent = FilledTextField;
  } else if (outlined) {
    InputComponent = OutlinedTextField;
  }

  return (
    <View>
      {outlinedLabel && label ? (
        <Label font_medium small mb={8}>
          {label}
        </Label>
      ) : null}
      <InputComponent
        labelOffset={
          outlined
            ? {
                y0: 1,
              }
            : null
        }
        inputContainerStyle={
          filled
            ? styles.filledStyle
            : outlinedLabel
              ? styles.outlinedLabelStyle
              : null
        }
        contentInset={
          filled || outlinedLabel
            ? {
                label: 0,
                top: 4,
                input: 14,
              }
            : null
        }
        renderRightAccessory={() => {
          if (!secureTextEntry) {
            return;
          }
          return (
            <View style={styles.icEye}>
              <Icon
                color={icEyeColor}
                name={passwordVisible ? 'visibility-off' : 'visibility'}
                size={ThemeUtils.fontLarge}
                onPress={() => setPasswordVisible(prevVal => !prevVal)}
              />
            </View>
          );
        }}
        {...props}
        baseColor={filled || outlinedLabel ? 'transparent' : baseColor}
        tintColor={filled || outlinedLabel ? 'transparent' : tintColor}
        // errorColor={filled || outlinedLabel ? 'transparent' : props.errorColor}
        activeLineWidth={filled || outlined ? 0 : 2}
        secureTextEntry={passwordVisible}
      />
    </View>
  );
};

AppInput.propTypes = {
  ...TextField.propTypes,
  icEyeColor: PropTypes.string,
  filled: PropTypes.bool,
  outlined: PropTypes.bool,
  outlinedLabel: PropTypes.bool,
} as PropTypes.ValidationMap<AppInputProps>;

AppInput.defaultProps = {
  ...(TextField.defaultProps as AppInputProps),
  filled: false,
  outlined: false,
  outlinedLabel: false,
};
export default AppInput;
