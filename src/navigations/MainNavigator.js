
import React from 'react'
import NavigationString from '../constants/NavigationString';

import * as Screens from '../screens';
import TabNavigator from './TabNavigator';

export default function(Stack) {
  return (
    <>
      <Stack.Screen
        name={NavigationString.TAB_LIST_SCREEN}
        component={TabNavigator}
      />
      <Stack.Screen
        name={NavigationString.NEW_CHAT_SCREEN}
        component={Screens.NewChat}
      />
      <Stack.Screen
        name={NavigationString.NEW_GROUP_SCREEN}
        component={Screens.NewGroup}
      />
      <Stack.Screen
        name={NavigationString.CHAT_SCREEN}
        component={Screens.Chat}
      />
      <Stack.Screen
        name={NavigationString.CALL_SCREEN}
        component={Screens.Call}
      />
    </>
  )
}