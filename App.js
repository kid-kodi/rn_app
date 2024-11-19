import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import OnboardNavigator from './src/navigations/OnboardNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <OnboardNavigator />
    </NavigationContainer>
  )
}