import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, BackHandler} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import JailMonkey from 'jail-monkey';
import {Toast} from 'src/component';
import {Color} from 'src/utils';
import RootNavigator from 'src/router';
import {persistor, store} from 'src/reduxToolkit/store';

const MyAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.BLACK,
    background: Color.PRIMARY_BACKGROUND,
    card: Color.BLACK,
    text: Color.WHITE,
  },
};

const App: React.FC = () => {
  // Implemented security from root devices, if device is rooted, it will exit the app
  useEffect(() => {
    if (JailMonkey.isJailBroken()) {
      BackHandler.exitApp();
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor={Color.TRANSPARENT}
          />
          <NavigationContainer theme={MyAppTheme}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
        <Toast ref={ref => Toast.setRef(ref)} />
      </PersistGate>
    </Provider>
  );
};

export default App;
