import { Platform } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import { Toast } from 'src/component';
import { Color } from './Color';
import Messages from './MessageUtils';
import Constants from './Constants';

import CommonStyle from './CommonStyles';
import ThemeUtils from './ThemeUtils';
import Strings from './Strings';
import PermissionUtils from './PermissionUtils';
import { GeminiConfig, fileToGenerativePart } from './GeminiConfig';
import Clipboard from '@react-native-clipboard/clipboard';

// import {createIconSetFromFontello} from 'react-native-vector-icons';
// import fontelloConfig from '../../../config.json'

const IS_ANDROID: boolean = Platform.OS === 'android';
const IS_IOS: boolean = Platform.OS === 'ios';
// const IS_LT_LOLLIPOP = Platform.Version < 21;

// use for check internet connection
const isNetworkConnected = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  return state.isConnected ?? false;
};

// const Icon = createIconSetFromFontello(fontelloConfig);

const ToastType = {
  SUCCESS: 'success',
  ERROR: 'error',
  FAIL: 'fail',
};

const showToast = (
  title: string,
  message: string,
  type: string,
  onHide?: () => void,
  onShow?: () => void,
) => {
  //  type: 'success | error | info',

  Toast.show({
    type,
    position: 'bottom',
    text1: title === '' ? undefined : title,
    text2: message,
    visibilityTime: 1000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 20,
    onShow,
    onHide,
  });
};

const showMessage = (
  message: string,
  messageType = Constants.MessageType.SUCCESS,
  options = {},
) =>
  Toast.show({
    text1: message,
    type: messageType,
    ...options,
  });

const copytoClipboard = async (text: string) => {
  Clipboard.setString(text);
  showToast(
    'Success',
    'Copied to clipboard',
    ToastType.SUCCESS,
  );
}

export {
  IS_IOS,
  IS_ANDROID,
  Color,
  Messages,
  Constants,
  CommonStyle,
  ThemeUtils,
  Strings,
  showMessage,
  isNetworkConnected,
  showToast,
  PermissionUtils,
  ToastType,
  GeminiConfig,
  fileToGenerativePart,
  copytoClipboard
};
