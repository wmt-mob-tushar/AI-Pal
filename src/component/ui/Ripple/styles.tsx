import {StyleSheet} from 'react-native';
import {Color} from 'src/utils';

const radius = 30;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.TRANSPARENT,
    overflow: 'hidden',
  },
  ripple: {
    borderRadius: radius,
    height: radius * 2,
    overflow: 'hidden',
    position: 'absolute',
    width: radius * 2,
  },
});
export {styles, radius};
