import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from 'src/router/Routes';
// Screens Name
import Login from 'src/screens/UnAuthenticated/Login';
import Intro from 'src/screens/UnAuthenticated/Intro';

export enum AuthType {
  Login = 'Login',
  SignUp = 'SignUp',
}

export type UnAuthenticatedParamList = {
  [Routes.Login]: {type: AuthType};
  [Routes.Intro]: undefined;
};

const Stack = createNativeStackNavigator<UnAuthenticatedParamList>();
const Navigator = () => (
  <Stack.Navigator initialRouteName={Routes.Intro}>
    <Stack.Screen
      name={Routes.Intro}
      component={Intro}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name={Routes.Login}
      component={Login}
      options={{
        presentation: 'modal',
        title: '',
      }}
    />
  </Stack.Navigator>
);
export default Navigator;
