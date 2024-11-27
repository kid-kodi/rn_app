import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationString from '../constants/NavigationString';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

import * as Screens from '../screens';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={NavigationString.CHATS_SCREEN}
      screenOptions={{
        headerShown: false,
        style: styles.customBottomtabsStyle,
        tabBarActiveTintColor: Colors.blackColor,
        tabBarInactiveTintColor: Colors.gray7,
        tabBarStyle: {backgroundColor: Colors.whiteColor},
        tabBarShowLabel: false,
        size: 30,
      }}>
      <Tab.Screen
        name={NavigationString.CHATS_SCREEN}
        component={Screens.ChatList}
        options={{
            tabBarIcon: ({color, size, focused}) =>
              focused ? (
                <Icon name="chatbubble" size={size} color={color} />
              ) : (
                <Icon name="chatbubble-outline" size={size} color={color} />
              ),
          }}
      />
      <Tab.Screen
        name={NavigationString.USER_LIST_SCREEN}
        component={Screens.UserList}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name="people" size={size} color={color} />
            ) : (
              <Icon name="people-outline" size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name={NavigationString.PROFILE_SCREEN}
        component={Screens.Profile}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Icon name="person" size={size} color={color} />
            ) : (
              <Icon name="person-outline" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    customBottomtabsStyle: {
      //height: moderateScale(60)
      backgroundColor: 'red',
    },
  });
  
