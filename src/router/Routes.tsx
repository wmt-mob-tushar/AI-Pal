const Routes = {
  /*  Root Stacks    */
  Authenticated: 'Authenticated',
  UnAuthenticated: 'UnAuthenticated',
  Splash: 'Splash',
  /*  Non-Authenticated Routes    */
  Login: 'Login',
  SignUp: 'SignUp',
  Intro: 'Intro',
  Setting: 'Setting',
  /*  Authenticated Routes    */
  Home: 'Home',
  Profile: 'Profile',
  AIPal: 'AIPal',

  Dalle: 'Dalle',
  ExploredGPT: 'ExploredGPT',
  DrawerNavigation: 'DrawerNavigation',
  CameraView: 'CameraView',
  CameraPreview: 'CameraPreview',
  ImagePreview: 'ImagePreview',
} as const;
export default Routes;
