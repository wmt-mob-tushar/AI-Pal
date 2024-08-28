import React, {useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import Routes from 'src/router/Routes';
// Screens Name
import ExploredGPT from 'src/screens/Authenticated/SideBar/ExploredGPT';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Color, showToast, Strings, ThemeUtils, ToastType} from 'src/utils';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerActions} from '@react-navigation/native';
import AIPal from 'src/screens/Authenticated/SideBar/AIPal';
import {useSelector} from 'react-redux';
import {RootState} from 'src/reduxToolkit/store';
import * as ContextMenu from 'zeego/context-menu';
import database from '@react-native-firebase/database';
import {Hr} from 'src/component';
import styles from './style';

export type DrawerParamList = {
  [Routes.AIPal]: {chatRoomId: string; image?: string};
  [Routes.ExploredGPT]: undefined;
};

interface UserChatRoom {
  chatId: string;
  lastUserMessage: string;
}

const Drawer = createDrawerNavigator<DrawerParamList>();

interface DrawerNavigationProps {
  navigation: DrawerNavigationProp<DrawerParamList>;
}

export const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { navigation } = props;
  const {user} = useSelector((state: RootState) => state.app);
  const [history, setHistory] = useState<UserChatRoom[]>([]);
  const emailToUsername = (email: string) => email.split('@')[0];

  useEffect(() => {
    const ref = database().ref(`users/${user?.uid}/chatsRoom`);
    ref.on('value', snapshot => {
      const data = snapshot.val();
      const chats = Object.values(data ?? {});
      setHistory(chats as UserChatRoom[]);
    });
  }, [user?.uid]);

  const handleChatAlert = (chatId: string) => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleChatDelete(chatId),
        },
      ],
      {cancelable: false},
    );
  };

  const handleChatDelete = async (chatId: string) => {
    try {
      await database().ref(`/users/${user?.uid}/chatsRoom/${chatId}`).remove();
      showToast('Success', Strings.deleteChatSuccess, ToastType.SUCCESS);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <Hr lineStyle={styles.hr} />
        {history.map((chat, index) => (
          <ContextMenu.Root key={chat.chatId}>
            <ContextMenu.Trigger>
              <DrawerItem
                label={chat.lastUserMessage}
                onPress={() =>
                  navigation.navigate(Routes.AIPal, {
                    chatRoomId: chat.chatId,
                  })
                }
                inactiveTintColor={Color.TEXT_SECONDARY}
              />
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Preview>
                {() => (
                  // eslint-disable-next-line react-native/no-inline-styles
                  <View style={{padding: 16, height: 200}}>
                    <Text>{chat.lastUserMessage}</Text>
                  </View>
                )}
              </ContextMenu.Preview>

              {/* <ContextMenu.Item key={'rename'} onSelect={() => {}}>
                <ContextMenu.ItemTitle>Rename</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: 'pencil',
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item> */}
              <ContextMenu.Item
                key="delete"
                onSelect={() => handleChatAlert(chat.chatId)}
                destructive>
                <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                <ContextMenu.ItemIcon
                  ios={{
                    name: 'trash',
                    pointSize: 18,
                  }}
                />
              </ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Root>
        ))}
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate(Routes.Setting)}>
        <Image
          source={{uri: 'https://galaxies.dev/img/meerkat_2.jpg'}}
          style={styles.avatar}
        />
        <Text style={styles.userName}>
          {emailToUsername(user?.email ?? '')}
        </Text>
        <Ionicons
          name="ellipsis-horizontal"
          size={24}
          color={Color.GREY_LIGHT}
        />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigation = ({navigation}: DrawerNavigationProps) => {
  return (
    <Drawer.Navigator
      initialRouteName={__DEV__ ? Routes.AIPal : Routes.AIPal}
      screenOptions={() => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            style={{marginLeft: 16}}>
            <Icon name="grip-lines" size={20} color={Color.WHITE} />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Color.INPUT,
        drawerActiveTintColor: Color.WHITE,
        drawerItemStyle: {borderRadius: 12},
        drawerLabelStyle: {marginLeft: -20},
        headerTitleStyle: {fontSize: ThemeUtils.fontNormal},
        // drawerStyle: {width: ThemeUtils.myWidth * 0.86},
      })}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={Routes.AIPal}
        component={AIPal}
        getId={() => Math.random().toString()}
        options={{
          title: 'AIPal',
          drawerIcon: () => (
            <View style={[styles.item, {backgroundColor: Color.BLACK}]}>
              <Image
                source={require('../../assets/images/logo-white.png')}
                style={styles.btnImage}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name={Routes.ExploredGPT}
        component={ExploredGPT}
        options={{
          title: 'Explore Pal',
          drawerIcon: () => (
            <View
              style={[
                styles.item,
                {
                  backgroundColor: Color.WHITE,
                  width: 28,
                  height: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Ionicons name="apps-outline" size={18} color={Color.BLACK} />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
