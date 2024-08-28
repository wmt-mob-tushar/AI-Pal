import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import PropTypes from 'prop-types';
import {Label} from 'src/component';
import {Color, CommonStyle, ThemeUtils} from 'src/utils';
import styles from './styles';

interface Option {
  name: string;
  value: string;
}

interface RadioGroupProps {
  onSelectOption: (value: string) => void;
  selectedOption: string;
  options: Option[];
}

const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {onSelectOption, selectedOption, options} = props;

  const renderOptions = (item: Option) => (
    <TouchableOpacity
      style={styles.optionCont}
      activeOpacity={0.7}
      onPress={() => onSelectOption && onSelectOption(item.value)}
      key={`${item.value}`}>
      <Icon
        name={
          selectedOption === item.value ? 'radiobox-marked' : 'radiobox-blank'
        }
        color={selectedOption === item.value ? Color.PRIMARY : Color.BLACK}
        size={ThemeUtils.fontNormal}
        style={styles.icRadio}
      />
      <Label small style={CommonStyle.full_flex} ms={8} mb={8}>
        {item.name}
      </Label>
    </TouchableOpacity>
  );
  return <View>{options.map(renderOptions)}</View>;
};
/* RadioGroup.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
}; */
export default RadioGroup;
