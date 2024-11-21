import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../styles/ResponsiveSize';
import FontFamily from '../constants/FontFamily';

export default function MyTextInput({
  value = '',
  onChangeText,
  errorText,
  placeholder = '',
  secureText = false,
  onPressSecure = () => {},
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = Colors.whiteColorOpacity70,
  ...props
}) {
  const lang = '';

  return (
    <>
      <View
        style={{
          ...styles.inputStyle,
          ...inputStyle,
        }}>
        <TextInput
          style={{
            ...styles.textStyle,
            ...textStyle,
            textAlign: lang == 'ar' ? 'right' : 'left',
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          {...props}
        />

        {!!secureText ? (
          <Text style={{...styles.textStyle, flex: 0}} onPress={onPressSecure}>
            {secureText}
          </Text>
        ) : null}
      </View>
      <View>
        {!!errorText ? (
          <Text style={{...styles.errorTextStyle}}>{errorText}</Text>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: moderateScale(52),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    backgroundColor: Colors.gray7,
    marginBottom: moderateScaleVertical(16),
  },
  textStyle: {
    fontSize: textScale(14),
    fontFamily: FontFamily.regular,
    flex: 1,
    color: Colors.whiteColor,
  },
  errorTextStyle: {
    fontSize: textScale(14),
    fontFamily: FontFamily.regular,
    color: Colors.redColor,
  },
});
