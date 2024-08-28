import {Color, Strings} from 'src/utils';
import {memo} from 'react';
import {useWindowDimensions, View} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import styles from './style';
import {AppButton} from 'src/component';
import {AuthType, UnAuthenticatedParamList} from 'src/router/UnAuthenticated';
import Routes from 'src/router/Routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const content = [
  {
    title: "Let's create.",
    bg: Color.LIME,
    fontColor: Color.PINK,
  },
  {
    title: "Let's brainstorm.",
    bg: Color.BROWN,
    fontColor: Color.SKY,
  },
  {
    title: "Let's discover.",
    bg: Color.ORANGE,
    fontColor: Color.BLUE,
  },
  {
    title: "Let's go.",
    bg: Color.TEAL,
    fontColor: Color.YELLOW,
  },
  {
    title: 'ChatGPT.',
    bg: Color.GREEN,
    fontColor: Color.PINK,
  },
];

interface IntroProps {
  navigation:NativeStackNavigationProp<UnAuthenticatedParamList>
}

const Intro = ({navigation}: IntroProps) => {
  const {width} = useWindowDimensions();
  const ballWidth = 30;
  const half = width / 2 - ballWidth / 2;

  const currentX = useSharedValue(half);
  const currentIndex = useSharedValue(0);
  const isAtStart = useSharedValue(true);
  const labelWidth = useSharedValue(0);
  const canGoToNext = useSharedValue(false);
  const didPlay = useSharedValue(false);

  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % content.length;
    }
    return currentIndex.value;
  }, [currentIndex]);

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        'RGB',
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2],
          ),
        },
      ],
    };
  }, [currentIndex, currentX]);

  const ballStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        'RGB',
      ),
      transform: [{translateX: currentX.value}],
    };
  });

  const mask = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].bg, content[currentIndex.value].bg],
        'RGB',
      ),
      transform: [{translateX: currentX.value}],
      width: width / 1.5,
    }),
    [currentIndex, currentX, labelWidth],
  );

  const style1 = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [content[newColorIndex.value].bg, content[currentIndex.value].bg],
      'RGB',
    ),
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(
          1,
          [1, 0],
          [0, -width * 2, -width, -width, -width, -width, -width],
        ),
      },
    ],
  }));

  const text = useDerivedValue(() => {
    const index = currentIndex.value;
    return content[index].title;
  }, [currentIndex]);

  // <== Reaction Start ==>
  useAnimatedReaction(
    () => labelWidth.value,
    newWidth => {
      currentX.value = withDelay(
        1000,
        withTiming(
          half + newWidth / 2,
          {
            duration: 800,
          },
          finished => {
            if (finished) {
              canGoToNext.value = true;
              isAtStart.value = false;
            }
          },
        ),
      );
    },
    [labelWidth, currentX, half],
  );

  useAnimatedReaction(
    () => canGoToNext.value,
    next => {
      if (next) {
        canGoToNext.value = false;
        currentX.value = withDelay(
          1000,
          withTiming(
            half,
            {
              duration: 800,
            },
            finished => {
              if (finished) {
                currentIndex.value = (currentIndex.value + 1) % content.length;
                isAtStart.value = true;
                didPlay.value = false;
              }
            },
          ),
        );
      }
    },
    [currentX, labelWidth],
  );
  // <== Reaction End ==>

  return (
    <Animated.View style={[styles.wrapper, style1]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.ball, ballStyle]} />
        <Animated.View style={[styles.mask, mask]} />
        <ReText
          onLayout={e => {
            labelWidth.value = e.nativeEvent.layout.width + 4;
          }}
          style={[styles.title, textStyle]}
          text={text}
        />
      </Animated.View>

      <View style={styles.AuthbottomSheet}>
        <AppButton
          width={'100%'}
          backgroundColor={Color.WHITE}
          icon="logo-apple"
          iconColor={Color.BLACK}
          borderRadius={12}>
          {Strings.appleLogin}
        </AppButton>

        <AppButton
          width={'100%'}
          backgroundColor={Color.GREY}
          textColor={Color.WHITE}
          icon="logo-google"
          borderRadius={12}>
          {Strings.googleLogin}
        </AppButton>

        <AppButton
          width={'100%'}
          click={() =>
            navigation.navigate(Routes.Login, {
              type: AuthType.SignUp,
            })
          }
          backgroundColor={Color.GREY}
          textColor={Color.WHITE}
          borderRadius={12}
          icon="mail">
          {Strings.emailSignUp}
        </AppButton>

        <AppButton
          width={'100%'}
          click={() =>
            navigation.navigate(Routes.Login, {
              type: AuthType.Login,
            })
          }
          outlined
          borderColor={Color.GREY}
          borderWidth={2}
          borderRadius={12}
          textColor={Color.WHITE}>
          {Strings.login}
        </AppButton>
      </View>
    </Animated.View>
  );
};

export default memo(Intro);
