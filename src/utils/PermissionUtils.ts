import {
  check,
  openSettings,
  Permission,
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {Alert} from 'react-native';
import {IS_ANDROID} from './index';
import MessageUtils from './MessageUtils';

/* type PermissionType =
  | typeof PERMISSIONS.ANDROID.CAMERA
  | typeof PERMISSIONS.IOS.CAMERA
  | typeof PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
  | typeof PERMISSIONS.IOS.PHOTO_LIBRARY
  | typeof PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
  | typeof PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  | typeof PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
 */
const startPermissionRequest = async (
  permission: string,
  permissionTitle: string,
  permissionMessage: string,
): Promise<boolean> => {
  let status = await check(permission as Permission);
  switch (status) {
    case RESULTS.DENIED:
      status = await request(permission as Permission);
      break;
    case RESULTS.BLOCKED:
      openAlertDialoge(permissionTitle, permissionMessage);
      break;
  }
  return status === RESULTS.GRANTED;
};

/* For location permission */
const startMultiplePermissionRequest = async (
  permission: string[],
  permissionTitle: string,
  permissionMessage: string,
): Promise<boolean> => {
  let status;
  const statuses = await requestMultiple(permission as Permission[]);
  if (IS_ANDROID) {
    const coarseLocationStatus =
      statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
    const fineLocationStatus =
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

    if (
      coarseLocationStatus === RESULTS.GRANTED &&
      fineLocationStatus === RESULTS.GRANTED
    ) {
      status = RESULTS.GRANTED;
    } else if (
      fineLocationStatus === RESULTS.BLOCKED ||
      coarseLocationStatus === RESULTS.BLOCKED
    ) {
      status = RESULTS.BLOCKED;
    }
  } else {
    const locationWhenInUseStatus =
      statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE];

    if (locationWhenInUseStatus === RESULTS.GRANTED) {
      status = RESULTS.GRANTED;
    } else if (locationWhenInUseStatus === RESULTS.BLOCKED) {
      status = RESULTS.BLOCKED;
    }
  }
  // console.log(statuses);
  switch (status) {
    case RESULTS.BLOCKED:
      openAlertDialoge(permissionTitle, permissionMessage);
      break;
  }
  return status === RESULTS.GRANTED;
};

const openAlertDialoge = (
  permissionTitle: string,
  permissionMessage: string,
) => {
  Alert.alert(
    permissionTitle,
    permissionMessage,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Okay',
        onPress: () => {
          openSettings().catch(() => console.warn('cannot open settings'));
        },
      },
    ],
    {cancelable: false},
  );
};
const requestCameraPermission = async (): Promise<boolean> =>
  await startPermissionRequest(
    IS_ANDROID ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
    MessageUtils.PermissionMessage.cameraPermissionTitle,
    MessageUtils.PermissionMessage.cameraPermissionMessage,
  );

const requestStoragePermission = async (): Promise<boolean> =>
  await startPermissionRequest(
    IS_ANDROID
      ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.PHOTO_LIBRARY,
    MessageUtils.PermissionMessage.storagePermissionTitle,
    MessageUtils.PermissionMessage.storagePermissionMessage,
  );

const requestLocationPermission = async (): Promise<boolean> =>
  await startMultiplePermissionRequest(
    IS_ANDROID
      ? [
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]
      : [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
    MessageUtils.PermissionMessage.locationPermissionTitle,
    MessageUtils.PermissionMessage.locationPermissionMessage,
  );
/* Reuired for Android 13 and more */
const requestNotificationPermission = async (): Promise<boolean> =>
  await startPermissionRequest(
    PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    MessageUtils.PermissionMessage.notificationPermissionTitle,
    MessageUtils.PermissionMessage.notificationPermissionMessage,
  );

/* Add relevent permissions in manifest for use */
export default {
  requestCameraPermission,
  requestStoragePermission,
  requestLocationPermission,
  startPermissionRequest,
  requestNotificationPermission,
  startMultiplePermissionRequest,
};
