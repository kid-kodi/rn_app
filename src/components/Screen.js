import {StatusBar, StyleSheet, SafeAreaView, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

export default function Screen({style = {}, children}) {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: Colors.whiteColor,
      }}>
      <StatusBar
        barStyle={"dark-content"}
      />
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.themeColor,
  },
});
