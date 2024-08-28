import PropTypes from 'prop-types';
import React, {PureComponent, ReactNode} from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Insets,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import {styles, radius} from './styles';

interface RippleProps {
  rippleColor?: string;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number | undefined;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleSequential?: boolean;
  disabled?: boolean;
  onLayout?: (event: any) => void;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
  delayPressIn?: number;
  delayPressOut?: number;
  hitSlop?: number | Insets | null | undefined;
  pressRetentionOffset?: Insets;
  children?: ReactNode;
  testID?: string;
  nativeID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  style?: any;
}
interface RippleObj {
  unique: number;
  progress: Animated.Value;
  locationX: number;
  locationY: number;
  R: number;
}
interface RippleState {
  width: number;
  height: number;
  ripples: RippleObj[];
}

export default class Ripple extends PureComponent<RippleProps, RippleState> {
  static defaultProps = {
    // ...TouchableWithoutFeedback.defaultProps,

    rippleColor: 'rgb(0, 0, 0)',
    rippleOpacity: 0.3,
    rippleDuration: 400,
    rippleSize: 0,
    rippleContainerBorderRadius: 0,
    rippleCentered: false,
    rippleSequential: false,
    disabled: false,
  };

  static propTypes = {
    ...Animated.View.propTypes,
    // ...TouchableWithoutFeedback.propTypes,

    rippleColor: PropTypes.string,
    rippleOpacity: PropTypes.number,
    rippleDuration: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleContainerBorderRadius: PropTypes.number,
    rippleCentered: PropTypes.bool,
    rippleSequential: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  unique: number = 0;

  mounted: boolean = false;

  constructor(props: RippleProps) {
    super(props);

    this.onLayout = this.onLayout.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.renderRipple = this.renderRipple.bind(this);

    this.unique = 0;
    this.mounted = false;

    this.state = {
      width: 0,
      height: 0,
      ripples: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    const {onLayout} = this.props;

    if (typeof onLayout === 'function') {
      onLayout(event);
    }

    this.setState({width, height});
  };

  onPress = (event: GestureResponderEvent) => {
    const {ripples} = this.state;
    const {onPress, rippleSequential} = this.props;

    if (!rippleSequential || !ripples.length) {
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => onPress(event));
      }

      this.startRipple(event);
    }
  };

  onLongPress = (event: GestureResponderEvent) => {
    const {onLongPress} = this.props;

    if (typeof onLongPress === 'function') {
      requestAnimationFrame(() => onLongPress(event));
    }

    this.startRipple(event);
  };

  onPressIn = (event: GestureResponderEvent) => {
    const {onPressIn} = this.props;

    if (typeof onPressIn === 'function') {
      onPressIn(event);
    }
  };

  onPressOut = (event: GestureResponderEvent) => {
    const {onPressOut} = this.props;

    if (typeof onPressOut === 'function') {
      onPressOut(event);
    }
  };

  startRipple = (event: GestureResponderEvent) => {
    const {rippleDuration, rippleCentered, rippleSize} = this.props;
    const {width, height} = this.state;

    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);

    const R =
      rippleSize! > 0
        ? 0.5 * rippleSize!
        : Math.sqrt((w2 + offsetX) ** 2 + (h2 + offsetY) ** 2);

    const ripple = {
      unique: this.unique++,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    }).start(() => {
      if (this.mounted) {
        this.setState(({ripples}) => ({ripples: ripples.slice(1)}));
      }
    });

    this.setState(({ripples}) => ({ripples: ripples.concat(ripple)}));
  };

  renderRipple = ({unique, progress, locationX, locationY, R}: RippleObj) => {
    const {rippleColor, rippleOpacity} = this.props;
    console.log('unique', unique);
    const rippleStyle = {
      top: locationY - radius,
      left: locationX - radius,
      backgroundColor: rippleColor,

      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],

      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [rippleOpacity!, 0],
      }),
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  };

  render() {
    const {ripples} = this.state;
    const {onPress, onPressIn, onPressOut, onLongPress, onLayout} = this;
    const {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      children,
      rippleContainerBorderRadius,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
      onLayout: __ignored__,
      ...props
    } = this.props;

    const touchableProps = {
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      onPress,
      onPressIn,
      testID,
      nativeID,
      accessible,
      accessibilityLabel,
      onPressOut,
      onLongPress: props.onLongPress ? onLongPress : undefined,
      onLayout,
    };

    const containerStyle = {
      borderRadius: rippleContainerBorderRadius,
    };

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        <Animated.View {...props} pointerEvents="box-only">
          {children}
          <View style={[styles.container, containerStyle]}>
            {ripples.map(this.renderRipple)}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
