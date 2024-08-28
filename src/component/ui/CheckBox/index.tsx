import React, {Component, ReactNode} from 'react';
import {
  StyleSheet,
  View,
  // ViewPropTypes,
  Image,
  Text,
  TouchableHighlight,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import PropTypes from 'prop-types';

interface CheckBoxProps extends ViewProps {
  leftText?: string;
  leftTextView?: ReactNode;
  rightText?: string;
  leftTextStyle?: StyleProp<ViewStyle>;
  rightTextView?: ReactNode;
  rightTextStyle?: StyleProp<ViewStyle>;
  checkedImage?: ReactNode;
  unCheckedImage?: ReactNode;
  onClick: () => void;
  isChecked: boolean;
  checkBoxColor?: string;
}

export default class CheckBox extends Component<CheckBoxProps> {
  static propTypes = {
    // ...View.,
    leftText: PropTypes.string,
    leftTextView: PropTypes.element,
    rightText: PropTypes.string,
    leftTextStyle: PropTypes.any,
    rightTextView: PropTypes.element,
    rightTextStyle: PropTypes.any,
    checkedImage: PropTypes.element,
    unCheckedImage: PropTypes.element,
    onClick: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    checkBoxColor: PropTypes.string,
  } as PropTypes.ValidationMap<CheckBoxProps>;

  static defaultProps = {
    leftText: '',
    leftTextStyle: {},
    rightTextStyle: {},
    leftTextView: () => {},
    rightText: '',
    checkedImage: () => {},
    unCheckedImage: () => {},
    rightTextView: () => {},
    checkBoxColor: '',
  };

  renderLeft() {
    const {leftTextView, leftText, leftTextStyle} = this.props;

    if (leftTextView) {
      return leftTextView;
    }
    if (!leftText) {
      return null;
    }
    return <Text style={[styles.leftText, leftTextStyle]}>{leftText}</Text>;
  }

  renderRight() {
    const {rightTextView, rightText, rightTextStyle} = this.props;

    if (rightTextView) {
      return rightTextView;
    }
    if (!rightText) {
      return null;
    }
    return <Text style={[styles.rightText, rightTextStyle]}>{rightText}</Text>;
  }

  renderImage() {
    const {isChecked, checkedImage, unCheckedImage} = this.props;

    if (isChecked) {
      return checkedImage || this.genCheckedImage();
    }
    return unCheckedImage || this.genCheckedImage();
  }

  genCheckedImage() {
    const {isChecked, checkBoxColor} = this.props;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const source: number = isChecked
      ? require('./img/ic_check_box.png')
      : require('./img/ic_check_box_outline_blank.png');

    return <Image source={source} style={{tintColor: checkBoxColor}} />;
  }

  render() {
    const {style, onClick} = this.props;

    return (
      <TouchableHighlight
        style={style}
        onPress={onClick}
        underlayColor="transparent">
        <View style={styles.container}>
          {this.renderLeft()}
          {this.renderImage()}
          {this.renderRight()}
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftText: {
    flex: 1,
    fontSize: 12,
  },
  rightText: {
    flex: 1,
    marginStart: 10,
  },
});
