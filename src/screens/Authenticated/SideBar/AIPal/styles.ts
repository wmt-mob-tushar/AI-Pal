import { StyleSheet } from 'react-native';
import { Color, ThemeUtils } from 'src/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newIcon: {
    marginRight: 16,
  },
  gptLogo: {
    width: ThemeUtils.relativeWidth(20),
    height: ThemeUtils.relativeWidth(20),
    alignSelf: 'center',
  },
  emtyTop: {
    marginTop: ThemeUtils.relativeHeight(30),
  },

  //messageBox
  messageBox: {
    flexDirection: 'row',
    marginVertical: ThemeUtils.relativeHeight(1),
    marginHorizontal: ThemeUtils.relativeWidth(4),
  },
  logo: {
    width: ThemeUtils.relativeWidth(11),
    height: ThemeUtils.relativeWidth(11),
    borderRadius: 100,
  },
  messageContainer: {
    flex: 1,
    borderRadius: 20,
    marginLeft: ThemeUtils.relativeWidth(2),
  },
  user: {
    fontSize: ThemeUtils.fontNormal,
    fontWeight: 'bold',
    color: Color.TEXT_SECONDARY,
  },
  message: {
    fontSize: ThemeUtils.fontNormal,
    color: Color.DARK,
    justifyContent: 'center'
  },
  contentContainer: {
    paddingVertical: ThemeUtils.relativeHeight(1),
    paddingBottom: ThemeUtils.relativeHeight(10),
  },
  activityIndicator: {
    alignSelf: 'flex-start',
  },

  image: {
    width: ThemeUtils.relativeWidth(50),
    height: ThemeUtils.relativeWidth(50),
    borderRadius: 10,
  },


  //messase Input
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.BLACK,
    paddingVertical: ThemeUtils.relativeHeight(1.5),
  },
  inputPanel: {
    flex: 1,
    flexDirection: 'row',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Color.INPUT,
    borderRadius: 20,
    paddingHorizontal: 16,
    // alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: ThemeUtils.relativeWidth(2),
    color: Color.WHITE,
  },
  sendButton: {
    marginHorizontal: ThemeUtils.relativeWidth(3),
  },
  inputIcon: {
    marginHorizontal: ThemeUtils.relativeWidth(3),
  },
  emptyContainer: {
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  inputImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    zIndex: -1,
  },
  imageContainer: {
    paddingTop: ThemeUtils.relativeHeight(2),
  },
  icon: {
    position: 'absolute',
    top: ThemeUtils.relativeHeight(2.5),
    left: ThemeUtils.relativeWidth(2),
  },
  loading: {
    position: 'absolute',
    height: ThemeUtils.myHeight,
    width: ThemeUtils.myWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: 100,
    width: 100,
    transform: [{ translateY: -60 }],
  },
  skeleton: {
    width: '100%',
    gap: 7,
    marginTop: 10,
  },
  skeletonStyle: {
    borderRadius: 5,
  },

  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  responseIcon: {
    marginRight: 10,
    height: '100%'
  },
  gotoUp: {
    backgroundColor: Color.WHITE,
    position: 'absolute',
    bottom: ThemeUtils.relativeHeight(12),
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default styles
