import { StyleSheet } from "react-native";
import { Color, ThemeUtils } from "src/utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchSection: {
        marginHorizontal: 16,
        borderRadius: 10,
        height: 34,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.ERROR,
    },
    searchIcon: {
        padding: 6,
    },
    input: {
        flex: 1,
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingLeft: 0,
        alignItems: 'center',
        color: Color.GREY_LIGHT,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: ThemeUtils.relativeWidth(5),
    },
    avatar: {
        width: ThemeUtils.relativeWidth(11),
        height: ThemeUtils.relativeWidth(11),
        borderRadius: 10,
    },
    userName: {
        fontSize: ThemeUtils.fontNormal,
        fontWeight: '600',
        flex: 1,
        color: Color.WHITE,
    },
    item: {
        borderRadius: 15,
        overflow: 'hidden',
    },
    btnImage: {
        margin: 6,
        width: ThemeUtils.relativeWidth(5),
        height: ThemeUtils.relativeWidth(5),
    },
    dallEImage: {
        width: ThemeUtils.relativeWidth(8),
        height: ThemeUtils.relativeWidth(8),
        resizeMode: 'cover',
    }, 
    hr: {
        marginTop: 10
    }
});


export default styles;