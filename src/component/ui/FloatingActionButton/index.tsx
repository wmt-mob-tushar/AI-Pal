/** @format */

import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleProp, ViewStyle } from "react-native";
import { circleStyle } from "src/utils/ThemeUtils";
import { Color } from "src/utils/Color";
import Ripple from "src/component/ui/Ripple";

interface FloatingActionButtonProps {
	size?: number;
	color?: string;
	icon?: string;
	iconColor?: string;
	iconSize?: number;
	mt?: number;
	mb?: number;
	ms?: number;
	me?: number;
	left?: boolean;
	right?: boolean;
	center?: boolean;
	style?: StyleProp<ViewStyle>;
	click?: () => void;
}

class FloatingActionButton extends React.Component<FloatingActionButtonProps> {
	static defaultProps = {
		size: 50,
		color: Color.PRIMARY,
		icon: "home",
		iconColor: Color.TEXT_PRIMARY,
		iconSize: 20,
		mt: 0,
		mb: 0,
		ms: 0,
		me: 0,
		left: false,
		right: false,
		center: false,
	};

	onClick = () => {
		const { click } = this.props;
		if (click) {
			click();
		}
	};

	render() {
		const {
			left,
			right,
			center,
			color,
			size,
			mt,
			mb,
			ms,
			me,
			style,
			icon,
			iconSize,
			iconColor,
		} = this.props;
		const stylesArray = [];
		const commonStyles = [];

		if (left) {
			stylesArray.push({ alignSelf: "flex-start" });
		} else if (right) {
			stylesArray.push({ alignSelf: "flex-end" });
		} else if (center) {
			stylesArray.push({ alignSelf: "center" });
		}

		stylesArray.push({
			backgroundColor: color,
			height: size,
			width: size,
			marginTop: mt,
			marginBottom: mb,
			marginStart: ms,
			marginEnd: me,
		});

		stylesArray.push(style);

		commonStyles.push({
			alignItems: "center",
			justifyContent: "center",
			elevation: 10,
		});

		return (
			<Ripple
				style={[circleStyle, stylesArray, commonStyles]}
				rippleContainerBorderRadius={30}
				onPress={this.onClick}
			>
				<Icon name={icon || "home"} size={iconSize} color={iconColor} />
			</Ripple>
		);
	}
}

/* FloatingActionButton.defaultProps = {
  size: 50,
  color: Color.PRIMARY,
  icon: 'home',
  iconColor: Color.TEXT_PRIMARY,
  iconSize: 20,
  mt: 0,
  mb: 0,
  ms: 0,
  me: 0,
  left: false,
  right: false,
  center: false,
}; */

/* FloatingActionButton.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  mt: PropTypes.number,
  mb: PropTypes.number,
  ms: PropTypes.number,
  me: PropTypes.number,
  left: PropTypes.bool,
  right: PropTypes.bool,
  center: PropTypes.bool,
}; */

export default FloatingActionButton;
