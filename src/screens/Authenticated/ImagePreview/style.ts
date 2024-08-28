import { StyleSheet } from "react-native";
import { Color, ThemeUtils } from "src/utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:Color.MODAL_BACKGROUND
    },
    image: {
        width: '100%',
        height: ThemeUtils.relativeHeight(70),
    },
    blurView: {
        ...StyleSheet.absoluteFillObject,
    }
});

export default styles;