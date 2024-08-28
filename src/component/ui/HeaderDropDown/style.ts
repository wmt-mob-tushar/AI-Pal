import { StyleSheet } from "react-native";
import { Color } from "src/utils";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontWeight: '500',
        fontSize: 16,
        color: Color.WHITE
    },
    selectedVer: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
        color: Color.TEXT_SECONDARY,
    }
});

export default styles;