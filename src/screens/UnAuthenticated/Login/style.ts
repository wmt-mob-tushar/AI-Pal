import { StyleSheet } from "react-native";
import { Color, ThemeUtils } from "src/utils";


const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: ThemeUtils.relativeWidth(20),
        height: ThemeUtils.relativeWidth(20),
        alignSelf: 'center',
        marginVertical: ThemeUtils.relativeHeight(10),
    },
    title: {
        fontSize: ThemeUtils.fontXXLarge,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Color.SKY
    },
    inputField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.PRIMARY,
        borderRadius: 12,
        backgroundColor: Color.INPUT,
        color: Color.WHITE
    },
    input: {
        flex: 1,
        padding: 10
    },
    inputIcon: {
        marginHorizontal: 12
    },
    inputContainer: {
        marginVertical: ThemeUtils.relativeHeight(3),
        gap: 10
    },
    errorText: {
        color: Color.ERROR
    }
});
export default styles;