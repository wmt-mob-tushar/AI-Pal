import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnAuthenticated from './UnAuthenticated';
import Authenticated from './Authenticated';
import Routes from './Routes';
import Splash from 'src/screens/Splash';

export type RootParamList = {
  [Routes.Authenticated]: undefined;
  [Routes.UnAuthenticated]: undefined;
  [Routes.Splash]: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

const Navigator = () => (
  <Stack.Navigator
    initialRouteName={Routes.Splash}
    screenOptions={{headerShown: false}}>
    <Stack.Screen name={Routes.Splash} component={Splash} />
    <Stack.Screen name={Routes.UnAuthenticated} component={UnAuthenticated} />
    <Stack.Screen name={Routes.Authenticated} component={Authenticated} />
  </Stack.Navigator>
);

export default Navigator;
