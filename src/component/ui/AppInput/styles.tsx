import {StyleSheet} from 'react-native';
import {Color} from 'src/utils';

export default StyleSheet.create({
  filledStyle: {
    backgroundColor: Color.PRIMARY,
    borderRadius: 4,
  },
  icEye: {
    paddingHorizontal: 10,
  },
  outlinedLabelStyle: {
    backgroundColor: Color.WHITE,

    borderColor: Color.PRIMARY,
    borderRadius: 4,
    borderWidth: 1,
  },
});
