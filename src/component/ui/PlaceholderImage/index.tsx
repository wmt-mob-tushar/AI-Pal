import React, {PureComponent} from 'react';
import {
  Animated,
  ImageBackground,
  ImageProps,
  ImageStyle,
  ImageURISource,
  View,
} from 'react-native';
import styles from './styles';

type Props = {
  imageURL: string;
  placeholder:
    | number
    | Animated.Value
    | Animated.AnimatedInterpolation<string | number>
    | Animated.WithAnimatedObject<ImageURISource>;
  imageStyle: ImageStyle;
  isAnimatedReveal: boolean;
  containerStyle?: View['props']['style'];
  isBackground?: boolean;
  resizeMode?: ImageProps['resizeMode'];
  placeholderStyle?: ImageStyle;
  revealDuration?: number;
  children?: React.ReactNode;
};

type State = {
  isImageLoaded: boolean;
};

const DEFAULT_REVEAL_DURATION = 1000;
const MINIMUM_REVEAL_DURATION = 300;
const DEFAULT_RESIZE_MODE = 'cover';

class ImageWithPlaceholder extends PureComponent<Props, State> {
  // props: Props;

  animationDuration: number;

  imageAnimatedOpacity: Animated.Value;

  placeholderAnimatedOpacity: Animated.Value;

  constructor(props: Props) {
    super(props);
    const {imageURL, imageStyle, revealDuration} = props;
    this.state = {
      isImageLoaded: false,
    };
    if (typeof imageURL === 'object' && imageStyle.width && imageStyle.height) {
      console.warn(
        'You must provide a fixed height and width for network images',
      );
    }

    if (revealDuration && revealDuration >= MINIMUM_REVEAL_DURATION) {
      this.animationDuration = revealDuration;
    } else if (revealDuration) {
      this.animationDuration = DEFAULT_REVEAL_DURATION;
      console.warn(
        `revealDuration must be greater than ${MINIMUM_REVEAL_DURATION}`,
      );
    } else {
      this.animationDuration = DEFAULT_REVEAL_DURATION;
    }

    this.imageAnimatedOpacity = new Animated.Value(0);
    this.placeholderAnimatedOpacity = new Animated.Value(1);
  }

  onImageLoad = () => {
    const {isAnimatedReveal} = this.props;
    this.setState(
      {
        isImageLoaded: true,
      },
      () => {
        if (isAnimatedReveal) {
          Animated.timing(this.imageAnimatedOpacity, {
            toValue: 1,
            duration: this.animationDuration,
            useNativeDriver: true,
          }).start();
        } else {
          this.imageAnimatedOpacity.setValue(1);
        }
      },
    );
  };

  render() {
    const {
      imageStyle,
      imageURL,
      isBackground,
      children,
      placeholder,
      placeholderStyle,
      containerStyle,
      resizeMode,
    } = this.props;

    const {isImageLoaded} = this.state;

    return (
      <View style={[containerStyle || {}, styles.mainContainer]}>
        {/*  <Animated.Image
          style={[imageStyle, styles.imageOtherStyle]}
          source={{uri: imageURL}}
          onLoad={this.onImageLoad}
          resizeMode={resizeMode || DEFAULT_RESIZE_MODE}>
          {isBackground && children}
        </Animated.Image> */}

        {/* Commenting for resolve error and added new one if you have any issue you 
        can remove below conditional code and uncomment above code  */}

        {isBackground ? (
          <ImageBackground
            style={[
              imageStyle,
              styles.imageOtherStyle,
              {opacity: this.imageAnimatedOpacity},
            ]}
            source={{uri: imageURL}}
            onLoad={this.onImageLoad}
            resizeMode={resizeMode || DEFAULT_RESIZE_MODE}>
            {children}
          </ImageBackground>
        ) : (
          <Animated.Image
            style={[imageStyle, styles.imageOtherStyle]}
            source={{uri: imageURL}}
            onLoad={this.onImageLoad}
            resizeMode={resizeMode || DEFAULT_RESIZE_MODE}
          />
        )}
        {isImageLoaded ? null : (
          <Animated.Image
            style={[placeholderStyle || imageStyle, styles.placeholderImgStyle]}
            source={placeholder}
            resizeMode={resizeMode || DEFAULT_RESIZE_MODE}
          />
        )}
      </View>
    );
  }
}

export default ImageWithPlaceholder;
