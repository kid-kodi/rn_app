import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardNavigator from './OnboardNavigator';

import {useUser} from '../contexts/UserProvider';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const {user} = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user && <>{OnboardNavigator(Stack)}</>}
        {user && <>{MainNavigator(Stack)}</>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
