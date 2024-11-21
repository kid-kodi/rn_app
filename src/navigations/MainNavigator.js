
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
    </>
  )
}