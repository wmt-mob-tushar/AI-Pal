/** @format */

import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Routes from "src/router/Routes";
import { RootState } from "src/reduxToolkit/store";
import styles from "./styles";
import { RootParamList } from "src/router";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";

interface SplashProps {
	navigation: NativeStackNavigationProp<RootParamList, "Splash">;
}

const Splash = ({ navigation }: SplashProps) => {
	const { user } = useSelector((state: RootState) => state?.app);
	const scaleValue = useSharedValue(1);
	const opacityValue = useSharedValue(1);
	// Calculate scale factor to fill the screen
	const { width, height } = Dimensions.get("window");
	const maxDimension = Math.max(width, height);
	const initialDimension = 100; // Initial dimension of the logo
	const scaleFactor = maxDimension / initialDimension;

	const resetToAuth = CommonActions.reset({
		index: 0,
		routes: [{ name: Routes.Authenticated }],
	});

	const resetToNotAuth = CommonActions.reset({
		index: 0,
		routes: [{ name: Routes.UnAuthenticated }],
	});

	useEffect(() => {
		SplashScreen.hide();
		// Start the animations
		scaleValue.value = withTiming(scaleFactor, {
			duration: 2000,
			easing: Easing.out(Easing.exp),
		});

		opacityValue.value = withTiming(0, {
			duration: 1500,
			easing: Easing.inOut(Easing.ease),
		});

		// Navigation after the splash delay
		setTimeout(() => {
			if (!user) {
				navigation.dispatch(resetToNotAuth);
			} else {
				navigation.dispatch(resetToAuth);
			}
		}, 2000);
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: scaleValue.value,
				},
			],
			opacity: opacityValue.value,
		};
	});

	return (
		<View style={styles.container}>
			<Animated.Image
				source={require("../../assets/images/logo-white.png")}
				style={[styles.logo, animatedStyle]}
				resizeMode="contain"
			/>
		</View>
	);
};

export default Splash;
