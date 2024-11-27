import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontFamily from '../constants/FontFamily';
import Colors from '../constants/Colors';
import {textScale} from '../styles/ResponsiveSize';

export default function MyText({text = '', style = {}, children, ...props}) {
  return (
    <Text
      style={{
        ...styles.textStyle,
        color: Colors.blackColor,
        ...style,
      }}
      {...props}>
      {text} {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: FontFamily.regular,
    color: Colors.whiteColor,
    fontSize: textScale(12),
    textAlign: 'left'
  },
});
