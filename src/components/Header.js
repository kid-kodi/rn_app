import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, textScale} from '../styles/ResponsiveSize';
import FontFamily from '../constants/FontFamily';
import {useNavigation} from '@react-navigation/native';
import Colors from '../constants/Colors';
import ImagePath from '../constants/ImagePath';
import MyText from './MyText';
import MyImage from './MyImage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header({
  onPressLeft,
  leftText = '',
  isLeftImage = true,
  imageBar,
  titleBar,
  subTitleBar,
  style = {},
  rightTextStyle = {},
  rightText = '',
  onPressRight = () => {},
  rightImage = null,
  rightFirstAction,
  onPressFirst = () => {},
  rightSecondAction,
  onPressSecond = () => {},
}) {
  const navigation = useNavigation();
  const selectedTheme = '';
  return (
    <View style={{...styles.container, ...style}}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        {isLeftImage ? (
          <TouchableOpacity
            style={{marginRight: moderateScale(16)}}
            onPress={!!onPressLeft ? onPressLeft : () => navigation.goBack()}>
            <Image
              style={{
                tintColor:
                  selectedTheme == 'dark'
                    ? Colors.whiteColor
                    : Colors.blackColor,
              }}
              source={ImagePath.icBack}
            />
          </TouchableOpacity>
        ) : null}

        {!!leftText ? (
          <MyText style={styles.titleStyle} text={leftText} />
        ) : null}

        {imageBar && (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginHorizontal: moderateScale(10),
            }}>
            <MyImage
              url={imageBar}
              imageStyle={{width: 40, height: 40, borderRadius: 50}}
            />
            {titleBar && (
              <View>
                <MyText style={{...styles.titleBarStyle}}>{titleBar}</MyText>
                {subTitleBar && (
                  <MyText style={{...styles.subTitleBarStyle}}>
                    {subTitleBar}
                  </MyText>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
        {!!rightText ? (
          <TouchableOpacity onPress={onPressRight}>
            <MyText style={{...styles.textStyle, ...rightTextStyle}}>
              {rightText}
            </MyText>
          </TouchableOpacity>
        ) : null}

        {!!rightImage ? (
          <TouchableOpacity onPress={onPressRight}>
            <Image
              style={{
                tintColor:
                  selectedTheme == 'dark'
                    ? Colors.whiteColor
                    : Colors.blackColor,
              }}
              source={rightImage}
            />
          </TouchableOpacity>
        ) : null}

        {!!rightFirstAction ? (
          <TouchableOpacity onPress={onPressFirst}>
            <Icon name={rightFirstAction} size={30} color={Colors.grey} />
          </TouchableOpacity>
        ) : null}

        {!!rightSecondAction ? (
          <TouchableOpacity onPress={onPressSecond}>
            <Icon name={rightSecondAction} size={25} color={Colors.grey} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: moderateScale(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
  },
  textStyle: {
    fontSize: textScale(16),
    fontFamily: FontFamily.bold,
    fontWeight: 'bold',
  },
  titleBarStyle: {
    fontSize: textScale(16),
    fontFamily: FontFamily.bold,
    fontWeight: '600',
  },
  subTitleBarStyle: {
    fontSize: textScale(13),
    fontFamily: FontFamily.regular,
  },
  titleStyle: {
    fontSize: textScale(16),
    fontFamily: FontFamily.bold,
    fontWeight: 'bold',
  },
});
