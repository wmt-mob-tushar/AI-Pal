import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from 'src/router/Routes';
import Setting from 'src/screens/Authenticated/Setting';
import CameraView from 'src/screens/Authenticated/CameraView';
import ImagePreview from 'src/screens/Authenticated/ImagePreview';
import DrawerNavigation from './DrawerNavigation';

export type AuthenticatedParamList = {
  [Routes.DrawerNavigation]: undefined;
  [Routes.Setting]: undefined;
  [Routes.CameraView]: {
    setImage: (image: string) => void;
    setIsHighlightedImage: (isHighlightedImage: boolean) => void;
  };
  [Routes.ImagePreview]: {image: string | undefined};
};

const Stack = createNativeStackNavigator<AuthenticatedParamList>();

const Navigator = () => (
  <Stack.Navigator
    initialRouteName={Routes.DrawerNavigation}
    screenOptions={() => ({
      headerShown: false,
    })}>
    <Stack.Screen name={Routes.DrawerNavigation} component={DrawerNavigation} />
    <Stack.Screen
      name={Routes.Setting}
      component={Setting}
      options={{
        headerShown: true,
        presentation: 'modal',
      }}
    />
    <Stack.Screen name={Routes.CameraView} component={CameraView} />
    <Stack.Screen
      name={Routes.ImagePreview}
      component={ImagePreview}
      options={{
        presentation: 'transparentModal',
      }}
    />
  </Stack.Navigator>
);

export default Navigator;
