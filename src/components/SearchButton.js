import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../assets/styles/Colors';
import FontFamily from '../assets/styles/FontFamily';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../assets/styles/ResponsiveSize';
import {useSettings} from '../contexts/SettingsProvider';
import Icon from 'react-native-vector-icons/Feather';
import MyText from './MyText';

export default function SearchButton({
  value = '',
  onChangeText,
  placeholder = '',
  isSearch = false,
  inputStyle = {},
  textStyle = {},
  placeholderTextColor = Colors.gray6,
  ...props
}) {
  const {settings} = useSettings();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...styles.inputStyle,
        ...inputStyle,
      }}>
      <Icon name="search" size={15} color={Colors.blackOpacity20} />
      <MyText
        style={{
          ...styles.textStyle,
          ...textStyle,
          textAlign: settings['language'] == 'ar' ? 'right' : 'left',
        }}
        text={placeholder}
        {...props}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: moderateScale(32),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    alignItems: 'center',
    backgroundColor: Colors.blackOpacity10,
    marginBottom: moderateScaleVertical(16),
    borderColor: Colors.gray7,
    gap: 10,
  },
  textStyle: {
    fontSize: textScale(14),
    fontFamily: FontFamily.regular,
    flex: 1,
    color: Colors.gray2,
  },
});
