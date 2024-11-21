import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MyImage from './MyImage';
import Colors from '../assets/styles/Colors';
import FontFamily from '../assets/styles/FontFamily';
import {textScale} from '../assets/styles/ResponsiveSize';

const imageSize = 50;

export default function DataItem(props) {
  const {
    title,
    subTitle,
    image,
    imageStyle = {width: 50, height: 50, borderRadius: 50},
    type,
    isChecked,
    icon,
    unreadCount,
    rightText,
    rightAction,
  } = props;

  const hideImage = props.hideImage && props.hideImage === true;

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        {!icon && !hideImage && <MyImage url={image} imageStyle={imageStyle} />}

        {icon && (
          <View style={styles.leftIconContainer}>
            <Icon name={icon} size={25} color={Colors.themeColor} />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.title,
              ...{color: type === 'button' ? Colors.primary : Colors.textColor},
            }}>
            {title}
          </Text>

          {subTitle && (
            <Text numberOfLines={1} style={styles.subTitle}>
              {subTitle}
            </Text>
          )}
        </View>

        {unreadCount > 0 && (
          <View style={styles.badgeConainer}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}

        {type === 'checkbox' && (
          <View
            style={{
              ...styles.iconContainer,
            }}>
            {isChecked && <Icon name="checkbox" size={25} />}
            {!isChecked && <Icon name="square-outline" size={25} />}
          </View>
        )}

        {type === 'link' && (
          <View>
            <Icon
              name="chevron-forward-outline"
              size={18}
              color={Colors.grey}
            />
          </View>
        )}

        {rightText && (
          <View>
            <Text style={{fontSize: 11, color: Colors.blackOpacity40}}>
              {rightText}
            </Text>
          </View>
        )}

        {rightAction && (
          <View>
            <TouchableOpacity
              onPress={props.rightActionPress}
              style={{fontSize: 11, color: Colors.blackOpacity40}}>
              <Icon
                name="chevron-forward-outline"
                size={18}
                color={Colors.grey}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 7,
    alignItems: 'center',
    minHeight: 50,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: textScale(16),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: FontFamily.regular,
    color: Colors.gray6,
    letterSpacing: 0.3,
  },
  iconContainer: {
    borderColor: Colors.lightGrey,
    flex: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedStyle: {
    backgroundColor: Colors.primary,
    borderColor: 'transparent',
  },
  leftIconContainer: {
    backgroundColor: Colors.blackOpacity10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: imageSize,
    height: imageSize,
  },
  badgeConainer: {
    backgroundColor: Colors.redColor,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textColor: Colors.whiteColor,
    marginRight: 5,
  },
  badgeText: {
    color: Colors.whiteColor,
    letterSpacing: 0.3,
  },
});
