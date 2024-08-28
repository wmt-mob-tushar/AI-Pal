import { StyleSheet } from "react-native";
import { Color, ThemeUtils } from "src/utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    canvas: {
        ...StyleSheet.absoluteFillObject,
    },
    captureButtonContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingBottom: ThemeUtils.relativeHeight(5),
    },
    imageCaptureButton: {
        height: ThemeUtils.relativeHeight(10),
        width: ThemeUtils.relativeHeight(10),
        borderRadius: 100,
        backgroundColor: Color.TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Color.WHITE
    },
    innerCircle: {
        height: ThemeUtils.relativeHeight(6),
        width: ThemeUtils.relativeHeight(6),
        borderRadius: 100,
        backgroundColor: Color.WHITE
    },
    drawingButton: {
        height: ThemeUtils.relativeWidth(10),
        width: ThemeUtils.relativeWidth(10),
        borderRadius: 100,
        backgroundColor: Color.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;