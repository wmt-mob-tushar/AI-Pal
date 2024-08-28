import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import {Color, showToast, Strings, ThemeUtils, ToastType} from 'src/utils';
import {AppButton} from 'src/component';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthType, UnAuthenticatedParamList} from 'src/router/UnAuthenticated';
import {Controller, useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MessageUtils from 'src/utils/MessageUtils';
import {RootParamList} from 'src/router';
import {CommonActions} from '@react-navigation/native';
import Routes from 'src/router/Routes';
import {useDispatch} from 'react-redux';
import {setUser, User} from 'src/reduxToolkit/rootSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

export type LoginProps = NativeStackScreenProps<
  UnAuthenticatedParamList & RootParamList,
  'Login'
>;

interface FormValue {
  [Strings.email]: string;
  [Strings.password]: string;
}

const Login = ({route, navigation}: LoginProps) => {
  const {type} = route.params;
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: {errors},
  } = useForm<FormValue>();
  const [loader, setLoader] = useState<boolean>(false);
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleLogin = async (data: FormValue) => {
    setLoader(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      const user = userCredential.user;
      if (user) {
        let userData: User = {
          email: user.email as string,
          password: data.password,
          uid: user.uid,
        };
        dispatch(setUser(userData));
        setLoader(false);
        reset();
        showToast(
          Strings.appName,
          MessageUtils.Success.loginSuccess,
          ToastType.SUCCESS,
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: Routes.Authenticated}],
          }),
        );
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        setError(Strings.email, {
          type: 'manual',
          message: MessageUtils.Errors.userNotFoundErr,
        });
        setLoader(false);
      } else if (error.code === 'auth/wrong-password') {
        setError(Strings.password, {
          type: 'manual',
          message: MessageUtils.Errors.wrongPassword,
        });
        setLoader(false);
      } else {
        setLoader(false);
        console.log('error', error.message);
        showToast(
          Strings.appName,
          MessageUtils.Errors.somethingWentWrong,
          ToastType.ERROR,
        );
      }
    }
  };

  const handleSignUp = async (data: FormValue) => {
    setLoader(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      const user = userCredential.user;
      if (user) {
        let userData: User = {
          email: user.email as string,
          password: data.password,
          uid: user.uid,
        };
        await database().ref(`/users/${user.uid}`).set(userData);
        dispatch(setUser(userData));
        setLoader(false);
        reset();
        showToast(
          Strings.appName,
          MessageUtils.Success.signUpSuccess,
          ToastType.SUCCESS,
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: Routes.Authenticated}],
          }),
        );
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError(Strings.email, {
          type: 'manual',
          message: MessageUtils.Errors.alreadyRegistered,
        });
        setLoader(false);
      } else if (error.code === 'auth/weak-password') {
        setError(Strings.password, {
          type: 'manual',
          message: MessageUtils.Errors.weakPassword,
        });
        setLoader(false);
      } else {
        setLoader(false);
        console.log('error', error.message);
        showToast(
          Strings.appName,
          MessageUtils.Errors.somethingWentWrong,
          ToastType.ERROR,
        );
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../../../assets/images/logo-dark.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        {type === AuthType.Login ? Strings.welcomeBack : Strings.createAccount}
      </Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                style={[styles.inputField, styles.input]}
                placeholder="john@apple.com"
                placeholderTextColor={Color.GREY_LIGHT}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </>
          )}
          name={Strings.email}
          rules={{
            required: {
              value: true,
              message: MessageUtils.Errors.emailBlank,
            },
          }}
        />

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <View style={styles.inputField}>
                <TextInput
                  placeholder="password"
                  placeholderTextColor={Color.GREY_LIGHT}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={secureEntry}
                  style={styles.input}
                />
                <Icon
                  name={secureEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={Color.GREY_LIGHT}
                  style={styles.inputIcon}
                  onPress={() => setSecureEntry(!secureEntry)}
                />
              </View>

              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </>
          )}
          name={Strings.password}
          rules={{
            required: {
              value: true,
              message: MessageUtils.Errors.passwordBlank,
            },
          }}
        />
      </View>

      <AppButton
        width={'100%'}
        backgroundColor={Color.PRIMARY}
        textColor={Color.WHITE}
        mb={ThemeUtils.relativeHeight(10)}
        loading={loader}
        borderRadius={12}
        click={handleSubmit(
          type === AuthType.Login ? handleLogin : handleSignUp,
        )}>
        {type === AuthType.Login
          ? Strings.loginButton
          : Strings.createAccoutButton}
      </AppButton>
    </ScrollView>
  );
};

export default Login;
