import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { moderateScale, textScale } from '../styles/ResponsiveSize';
import FontFamily from '../constants/FontFamily';

export default function MyButton({
  onPress = () => {},
  text = '',
  style = {},
  leftImg = null,
  textStyle = {},
  isLoading = false,
}) {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={onPress}
      activeOpacity={0.7}>
      {!!leftImg ? <Image source={leftImg} /> : <View />}

      {isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
      )}

      <View />
    </TouchableOpacity>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blueLight,
    height: moderateScale(52),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
  },
  textStyle: {
    fontFamily: FontFamily.medium,
    color: Colors.whiteColor,
    fontSize: textScale(16),
  },
});
