import {StyleSheet} from 'react-native';
import {Color} from './Color';

const Style = StyleSheet.create({
    container: {
        backgroundColor: Color.WHITE,
        flex: 1,
    },
    content_center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    full_center: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    full_flex: {
        flex: 1,
    },
    master_full_flex: {
        backgroundColor: Color.WHITE,
        flex: 1,
    },
});

export default Style;
