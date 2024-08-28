import { StyleSheet } from "react-native";
import { Color, ThemeUtils } from "src/utils";

const styles = StyleSheet.create({
    container: {
        padding: ThemeUtils.relativeWidth(5),
        gap: 10,
    },
    inputField: {
        borderWidth: 1,
        borderColor: Color.PRIMARY,
        borderRadius: 12,
        padding: 10,
        backgroundColor: Color.WHITE,
        color: Color.BLACK
    },
    logo: {
        width: ThemeUtils.relativeWidth(15),
        height: ThemeUtils.relativeWidth(15),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginVertical: 20
    },
    title: {
        fontSize: ThemeUtils.fontLarge,
        fontWeight: 'bold',
        color: Color.SKY,
        marginTop: ThemeUtils.relativeHeight(2),
    }
});

export default styles;