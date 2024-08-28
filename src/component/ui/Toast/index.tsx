/* eslint-disable */
import React, {Component, ReactNode} from 'react';
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
} from 'react-native';
import SuccessToast from './components/success';
import ErrorToast from './components/error';
import InfoToast from './components/info';
import {complement} from './utils/arr';
import {includeKeys} from './utils/obj';
import styles from './styles';

const FRICTION = 8;

const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};

interface ToastProps {
  // Define any additional props for Toast component here
  topOffset?: number;
  bottomOffset?: number;
  visibilityTime?: number;
  onShow?: () => void;
  onHide?: () => void;
}

interface ToastState {
  inProgress: boolean;
  isVisible: boolean;
  animation: Animated.Value;
  topOffset: number;
  bottomOffset: number;
  height: number;
  position: string | any;
  type: string;
  visibilityTime: number;
  autoHide: boolean;
  text1?: any;
  text2?: any;
  onShow?: () => void;
  onHide?: () => void;
}

interface ToastStyles {
  base: {
    position: 'absolute';
    alignItems: 'center';
    justifyContent: 'center';
    left: number;
    right: number;
  };
  top: {
    top: number;
  };
  bottom: {
    bottom: number;
  };
}
const defaultComponentsConfig = {
  success: ({hide, text1, text2}: any) => (
    <SuccessToast onClose={hide} text1={text1} text2={text2} />
  ),
  error: ({hide, text1, text2}: any) => (
    <ErrorToast onClose={hide} text1={text1} text2={text2} />
  ),
  info: ({hide, text1, text2}: any) => (
    <InfoToast onClose={hide} text1={text1} text2={text2} />
  ),
};
const getInitialState = (props: ToastProps) => {
  const {
    topOffset = 30,
    bottomOffset = 40,
    visibilityTime = 4000,
    onShow,
    onHide,
  } = props;
  return {
    // layout
    topOffset,
    bottomOffset,
    height: 60,
    position: 'top',
    type: 'success',
    // timing (in ms)
    visibilityTime,
    autoHide: true,
    // content
    text1: undefined,
    text2: undefined,
    onShow,
    onHide,
  };
};
class Toast extends Component<ToastProps, ToastState> {
  private static _ref: Toast | null = null;
  private panResponder: PanResponderInstance;
  private timer: ReturnType<typeof setTimeout> | null = null;

  static setRef(ref: Toast | null = null): void {
    this._ref = ref;
  }
  static getRef(): Toast | null {
    return this._ref;
  }
  static clearRef(): void {
    this._ref = null;
  }
  static show(options: Partial<ToastState> = {}): void {
    if (this._ref) {
      this._ref.show(options);
    }
  }
  static hide(): void {
    if (this._ref) {
      this._ref.hide();
    }
  }
  constructor(props: ToastProps) {
    super(props);
    this._setState = this._setState.bind(this);
    this._animateMovement = this._animateMovement.bind(this);
    this._animateRelease = this._animateRelease.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.animate = this.animate.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.state = {
      ...getInitialState(props),
      inProgress: false,
      isVisible: false,
      animation: new Animated.Value(0),
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this._animateMovement(gesture);
      },
      onPanResponderRelease: (event, gesture) => {
        this._animateRelease(gesture);
      },
    });
  }
  _setState(reducer: any): Promise<void> {
    return new Promise(resolve => this.setState(reducer, () => resolve()));
  }
  _animateMovement(gesture: PanResponderGestureState): void {
    const {position, animation} = this.state;
    const {dy} = gesture;
    let value = 1 + dy / 100;
    if (position === 'bottom') {
      value = 1 - dy / 100;
    }
    if (value < 1) {
      animation.setValue(value);
    }
  }
  _animateRelease(gesture: PanResponderGestureState): void {
    const {position, animation} = this.state;
    const {dy, vy} = gesture;
    let value = 1 + dy / 100;
    if (position === 'bottom') {
      value = 1 - dy / 100;
    }
    if (value < 0.65) {
      Animated.spring(animation, {
        toValue: -2,
        speed: position === 'bottom' ? vy : -vy,
        useNativeDriver: true,
      }).start(() => {
        const {onHide} = this.state;
        if (onHide) {
          onHide();
        }
      });
    } else if (value < 0.95) {
      Animated.spring(animation, {
        toValue: 1,
        velocity: vy,
        useNativeDriver: true,
      }).start();
    }
  }
  async show(options: Partial<ToastState> = {}): Promise<void> {
    const {inProgress, isVisible} = this.state;
    if (inProgress || isVisible) {
      await this.hide();
    }
    await this._setState((prevState: {height: any}) => {
      return {
        ...prevState,
        ...getInitialState(this.props),
        /*
          Preserve the previously computed height (via onLayout).
          If the height of the component corresponding to this `show` call is different,
          onLayout will be called again and `height` state will adjust.

          This fixes an issue where a succession of calls to components with custom heights (custom Toast types)
          fails to hide them completely due to always resetting to the default component height
        */
        height: prevState.height,
        inProgress: true,
        ...options,
      };
    });
    await this.animateShow();
    await this._setState((prevState: any) => ({
      ...prevState,
      isVisible: true,
      inProgress: false,
    }));
    this.clearTimer();
    const {autoHide, onShow} = this.state;
    if (autoHide) {
      this.startTimer();
    }
    if (onShow) {
      onShow();
    }
  }
  async hide(): Promise<void> {
    await this._setState((prevState: any) => ({
      ...prevState,
      inProgress: true,
    }));
    await this.animateHide();
    this.clearTimer();
    await this._setState((prevState: any) => ({
      ...prevState,
      isVisible: false,
      inProgress: false,
    }));
    const {onHide} = this.state;
    if (onHide) {
      onHide();
    }
  }
  animateShow(): Promise<any> {
    return this.animate({toValue: 1});
  }
  animateHide() {
    return this.animate({toValue: 0});
  }
  animate({toValue}: {toValue: number}): Promise<void> {
    const {animation} = this.state;
    return new Promise(resolve => {
      Animated.spring(animation, {
        toValue,
        friction: FRICTION,
        useNativeDriver: true,
      }).start(() => resolve());
    });
  }
  startTimer(): void {
    const {visibilityTime} = this.state;
    this.timer = setTimeout(() => this.hide(), visibilityTime);
  }
  clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
  renderContent({config}: any): ReactNode {
    const componentsConfig = {
      ...defaultComponentsConfig,
      ...config,
    };
    const {type} = this.state;
    const toastComponent = componentsConfig[type];
    if (!toastComponent) {
      console.error(
        `Type '${type}' does not exist. Make sure to add it to your 'config'. You can read the documentation here: https://github.com/calintamas/react-native-toast-message/blob/master/README.md`,
      );
      return null;
    }
    return toastComponent({
      ...includeKeys({
        obj: this.state,
        keys: [
          'position',
          'type',
          'inProgress',
          'isVisible',
          'text1',
          'text2',
          'hide',
          'show',
        ],
      }),
      hide: this.hide,
      show: this.show,
    });
  }
  getBaseStyle(position: keyof ToastStyles = 'bottom') {
    const {topOffset, bottomOffset, height, animation} = this.state;
    const offset = position === 'bottom' ? bottomOffset : topOffset;
    // +5 px to completely hide the toast under StatusBar (on Android)
    const range = [height + 5, -offset];
    const outputRange = position === 'bottom' ? range : complement(range);
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange,
    });
    return [
      styles.base,
      styles[position],
      {
        transform: [{translateY}],
      },
    ];
  }
  onLayout(e: {nativeEvent: {layout: {height: any}}}) {
    this.setState({height: e.nativeEvent.layout.height});
  }
  render() {
    const {position} = this.state;
    const baseStyle = this.getBaseStyle(position);
    return (
      <Animated.View onLayout={this.onLayout} style={baseStyle}>
        {this.renderContent(this.props)}
      </Animated.View>
    );
  }
}
export default Toast;
