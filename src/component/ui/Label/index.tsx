import React, {ReactNode} from 'react';
import {StyleProp, Text, TextProps, TextStyle, ViewStyle} from 'react-native';

// import PropTypes from 'prop-types';

import {Color, ThemeUtils} from 'src/utils';

/* eslint camelcase: ["off", {ignoreDestructuring: true}] */

interface LabelProps extends TextProps {
  xxlarge?: boolean;
  xlarge?: boolean;
  large?: boolean;
  normal?: boolean;
  small?: boolean;
  xsmall?: boolean;
  bold?: boolean;
  bolder?: boolean;
  light?: boolean;
  lighter?: boolean;
  font_medium?: boolean;
  font_bold?: boolean;
  font_regular?: boolean;
  style?: any;
  color?: string;
  mt?: number;
  mb?: number;
  ms?: number;
  me?: number;
  align?: TextStyle['textAlign'];
  singleLine?: boolean;
  children?: ReactNode;
  onPress?: () => void;
}

class Label extends React.Component<LabelProps> {
  static defaultProps = {
    xsmall: false,
    small: false,
    normal: false,
    large: false,
    xlarge: false,
    xxlarge: false,
    bold: false,
    bolder: false,
    lighter: false,
    light: false,
    color: Color.TEXT_PRIMARY,
    font_bold: false,
    font_medium: false,
    font_regular: true,
    align: 'left',
    mt: 0,
    mb: 0,
    ms: 0,
    me: 0,
    singleLine: false,
  };

  onClick = () => {
    const {onPress} = this.props;

    if (onPress) {
      onPress();
    }
  };

  render() {
    const {
      xxlarge,
      xlarge,
      large,
      normal,
      small,
      xsmall,
      bold,
      bolder,
      light,
      lighter,
      font_medium,
      font_bold,
      style,
      color,
      mt,
      mb,
      ms,
      me,
      align,
      singleLine,
      numberOfLines,
      onPress,
      children,
    } = this.props;

    const stylesArray: TextStyle[] = [];
    if (xxlarge) {
      stylesArray.push({fontSize: ThemeUtils.fontXXLarge});
    } else if (xlarge) {
      stylesArray.push({fontSize: ThemeUtils.fontXLarge});
    } else if (large) {
      stylesArray.push({fontSize: ThemeUtils.fontLarge});
    } else if (normal) {
      stylesArray.push({fontSize: ThemeUtils.fontNormal});
    } else if (small) {
      stylesArray.push({fontSize: ThemeUtils.fontSmall});
    } else if (xsmall) {
      stylesArray.push({fontSize: ThemeUtils.fontXSmall});
    } else {
      stylesArray.push({fontSize: ThemeUtils.fontNormal});
    }

    if (bold) {
      stylesArray.push({fontWeight: '500'});
    } else if (bolder) {
      stylesArray.push({fontWeight: 'bold'});
    } else if (light) {
      stylesArray.push({fontWeight: '400'});
    } else if (lighter) {
      stylesArray.push({fontWeight: '200'});
    } else {
      stylesArray.push({fontWeight: 'normal'});
    }

    if (font_medium) {
      stylesArray.push({fontFamily: ThemeUtils.FontStyle.medium});
    } else if (font_bold) {
      stylesArray.push({fontFamily: ThemeUtils.FontStyle.bold});
    } else {
      stylesArray.push({fontFamily: ThemeUtils.FontStyle.regular});
    }

    stylesArray.push({
      color,
      marginTop: mt,
      marginBottom: mb,
      marginStart: ms,
      marginEnd: me,
      textAlign: align,
    });
    if (style === undefined) {
      stylesArray.push({}); // Push an empty style object
    } else {
      stylesArray.push(style); // Push the provided style
    }
    const numberOfLine = singleLine ? 1 : numberOfLines || undefined;

    return (
      <Text numberOfLines={numberOfLine} style={stylesArray} onPress={onPress}>
        {children}
      </Text>
    );
  }
}

/* Label.defaultProps = {
  xsmall: false,
  small: false,
  normal: false,
  large: false,
  xlarge: false,
  xxlarge: false,
  bold: false,
  bolder: false,
  lighter: false,
  light: false,
  color: Color.TEXT_PRIMARY,
  font_bold: false,
  font_medium: false,
  font_regular: true,
  align: 'left',
  mt: 0,
  mb: 0,
  ms: 0,
  me: 0,
  singleLine: false,
}; */
/* Label.propTypes = {
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  normal: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  xxlarge: PropTypes.bool,
  bold: PropTypes.bool,
  bolder: PropTypes.bool,
  light: PropTypes.bool,
  lighter: PropTypes.bool,
  color: PropTypes.string,
  font_bold: PropTypes.bool,
  font_medium: PropTypes.bool,
  font_regular: PropTypes.bool,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ms: PropTypes.number,
  me: PropTypes.number,
  align: PropTypes.string,
  singleLine: PropTypes.bool,
} as PropTypes.ValidationMap<LabelProps>; */
export default Label;
