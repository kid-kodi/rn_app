import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ImagePath from '../constants/ImagePath';
import Colors from '../assets/styles/Colors';
import FontFamily from '../assets/styles/FontFamily';
import {
  moderateScaleVertical,
  textScale,
} from '../assets/styles/ResponsiveSize';

export default function LeftTextRightImage({
  onPress = () => {},
  isSelected,
  text = '',
  image = ImagePath.icUnchek,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.horizontalView}
      onPress={onPress}>
      <Text
        style={{
          ...styles.langTextStyle,
          color: isSelected ? Colors.redColor : Colors.blackColor,
        }}>
        {text}
      </Text>
      <Image
        style={{tintColor: isSelected ? Colors.redColor : Colors.gray2}}
        source={image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  langTextStyle: {
    fontFamily: FontFamily.semiBold,
    color: Colors.blackColor,
    fontSize: textScale(14),
    textTransform: 'capitalize',
    marginVertical: moderateScaleVertical(8),
  },
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
