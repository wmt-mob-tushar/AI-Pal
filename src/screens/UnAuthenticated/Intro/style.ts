import { StyleSheet } from "react-native";
import { Color, ThemeUtils } from "src/utils";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mask: {
    zIndex: 1,
    position: 'absolute',
    left: '0%',
    height: 44,
    borderTopStartRadius: 22,
    borderBottomStartRadius: 22,
  },
  ball: {
    width: 40,
    zIndex: 10,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 20,
    position: 'absolute',
    left: '0%',
  },
  titleText: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    left: '0%',
    position: 'absolute',
  },
  content: {
    justifyContent: 'center',
    top: ThemeUtils.relativeRealHeight(40),
  },

  AuthbottomSheet: {
    width: '100%',
    backgroundColor: Color.BLACK,
    position: 'absolute',
    bottom: 0,
    zIndex: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    gap: 10,
  }
});

export default styles