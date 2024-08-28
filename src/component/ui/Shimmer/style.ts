import { StyleSheet } from "react-native";
import { ThemeUtils } from "src/utils";

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    image: {
        width: ThemeUtils.relativeWidth(11),
        height: ThemeUtils.relativeWidth(11),
        borderRadius: 100,
    },
    chatContainer: {
        flexDirection: 'row',
        marginVertical: ThemeUtils.relativeHeight(2),
        marginHorizontal: ThemeUtils.relativeWidth(4),
    },
    chat: {
        flex: 1,
        marginLeft: ThemeUtils.relativeWidth(2),
        gap: ThemeUtils.relativeWidth(2.5),
    },
    line: {
        width: '100%',
    },
    chatimage: {
        width: ThemeUtils.relativeWidth(50),
        height: ThemeUtils.relativeWidth(50),
        borderRadius: 10,
    }
});

export default styles