import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import OnboardNavigator from './src/navigations/OnboardNavigator';

import FlashMessage from 'react-native-flash-message';


export default function App() {

  return (
    <NavigationContainer>
      <OnboardNavigator />
      <FlashMessage position="top" /> 
    </NavigationContainer>
  )
}