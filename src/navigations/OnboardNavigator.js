import React from 'react';
import NavigationString from '../constants/NavigationString';

import * as Screens from '../screens';

export default function(Stack) {
  return (
    <>
      <Stack.Screen
        name={NavigationString.SPLASH_SCREEN}
        component={Screens.Splash}
      />
      <Stack.Screen
        name={NavigationString.INITIAL_SCREEN}
        component={Screens.Initial}
      />
      <Stack.Screen
        name={NavigationString.WELCOME_SCREEN}
        component={Screens.Welcome}
      />
      <Stack.Screen
        name={NavigationString.SIGNUP_SCREEN}
        component={Screens.Signup}
      />
      <Stack.Screen
        name={NavigationString.LOGIN_SCREEN}
        component={Screens.Login}
      />
      <Stack.Screen
        name={NavigationString.VERIFY_CODE_SCREEN}
        component={Screens.VerifyCode}
      />
      <Stack.Screen
        name={NavigationString.PROFILE_SETUP_SCREEN}
        component={Screens.ProfileSetup}
      />
    </>
  );
}
