import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationString from '../constants/NavigationString';

import * as Screens from '../screens';

const Stack = createNativeStackNavigator();

export default function OnboardNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NavigationString.SPLASH_SCREEN} component={Screens.Splash} />
      <Stack.Screen name={NavigationString.WELCOME_SCREEN} component={Screens.Welcome} />
      <Stack.Screen name={NavigationString.PHONE_INPUT_SCREEN} component={Screens.PhoneInput} />
      <Stack.Screen name={NavigationString.VERIFY_CODE_SCREEN} component={Screens.VerifyCode} />
      <Stack.Screen name={NavigationString.PROFILE_SETUP_SCREEN} component={Screens.ProfileSetup} />
    </Stack.Navigator>
  )
}