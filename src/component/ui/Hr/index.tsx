import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from 'src/utils';

interface HrProps {
  lineStyle?: StyleProp<ViewStyle>;
  text?: string;
  marginLeft?: number;
  marginRight?: number;
  textStyle?: StyleProp<TextStyle>;
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: Color.DIVIDER_COLOR,
    flex: 1,
    height: 0.5,
  },
  text: {
    flex: 1,
    marginLeft: 0,
    marginRight: 15,
    textAlign: 'center',
  },
});

class Hr extends Component<HrProps> {
  constructor(props: HrProps) {
    super(props);

    this.renderLine = this.renderLine.bind(this);
    this.renderText = this.renderText.bind(this);
    this.renderInner = this.renderInner.bind(this);
  }

  renderLine(key?: number) {
    const {lineStyle} = this.props;
    return <View key={key} style={[styles.line, lineStyle]} />;
  }

  renderText(key?: number) {
    const {textStyle, text} = this.props;

    return (
      <View key={key}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    );
  }

  renderInner() {
    const {text} = this.props;

    if (!text) {
      return this.renderLine();
    }
    return [this.renderLine(1), this.renderText(2), this.renderLine(3)];
  }

  render() {
    const {marginLeft, marginRight} = this.props;
    const innerStyle: {[key: string]: any}[] = [];

    innerStyle.push({
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft,
      marginRight,
    });

    return <View style={innerStyle}>{this.renderInner()}</View>;
  }
}

/* Hr.propTypes = {
  lineStyle: PropTypes.shape({}),
  text: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  textStyle: PropTypes.shape({}),
}; */

export default Hr;
