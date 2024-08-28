import {StyleSheet} from 'react-native';
import {Color, ThemeUtils} from 'src/utils';

export default StyleSheet.create({
  btn: {
    backgroundColor: Color.BLACK,
    borderRadius: 4,
    marginStart: ThemeUtils.relativeRealWidth(4),
    minWidth: ThemeUtils.relativeRealWidth(20),
    paddingHorizontal: ThemeUtils.relativeRealWidth(4),
    paddingVertical: ThemeUtils.relativeRealHeight(1),
  },
  btnCont: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: ThemeUtils.relativeRealWidth(4),
  },
  container: {
    backgroundColor: Color.DARK_LIGHT_BLACK,
    flex: 1,
    justifyContent: 'center',
  },
  dialogCont: {
    backgroundColor: Color.WHITE,
    borderRadius: 4,
    elevation: 5,
    marginHorizontal: ThemeUtils.relativeRealWidth(6),
    shadowColor: Color.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerTitle: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingHorizontal: ThemeUtils.relativeRealWidth(4),
    paddingVertical: ThemeUtils.relativeRealWidth(4),
  },
});
