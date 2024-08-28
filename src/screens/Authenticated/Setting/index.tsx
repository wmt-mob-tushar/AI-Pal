import {Alert, View, Image} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Color, showToast, Strings, ToastType} from 'src/utils';
import {AppButton} from 'src/component';
import auth from '@react-native-firebase/auth';
import {logout} from 'src/reduxToolkit/rootSlice';
import {CommonActions} from '@react-navigation/native';
import {RootParamList} from 'src/router';
import Routes from 'src/router/Routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import database from '@react-native-firebase/database';
import {RootState} from 'src/reduxToolkit/store';
import styles from './style';

interface SettingProps {
  navigation: NativeStackNavigationProp<RootParamList>;
}

const Setting = ({navigation}: SettingProps) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.app);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(logout());
      showToast('Success', 'Logout successfully', ToastType.SUCCESS);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Routes.UnAuthenticated}],
        }),
      );
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const deletechatHistoryALert = () => {
    Alert.alert(
      Strings.deleteChatHistory,
      Strings.deleteChatHistoryConfirm,
      [
        {
          text: Strings.cancel,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: Strings.delete,
          onPress: () => handledeleteAllChatRoom(),
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const handledeleteAllChatRoom = async () => {
    try {
      await database().ref(`/users/${user?.uid}/chatsRoom`).remove();
      showToast('Success', Strings.deleteChatHistorySuccess, ToastType.SUCCESS);
      navigation.goBack();
    } catch (error: any) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logo-dark.png')}
        style={styles.logo}
      />
      <AppButton
        width={'100%'}
        backgroundColor={Color.ERROR}
        click={handleLogout}
        textColor={Color.WHITE}>
        {Strings.logout}
      </AppButton>

      <AppButton
        width={'100%'}
        backgroundColor={Color.PRIMARY}
        click={deletechatHistoryALert}
        mt={10}
        textColor={Color.WHITE}>
        {Strings.deleteChatHistory}
      </AppButton>
    </View>
  );
};

export default Setting;
