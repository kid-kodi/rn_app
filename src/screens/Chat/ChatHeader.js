import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {moderateScale, textScale} from '../../styles/ResponsiveSize';
import Colors from '../../constants/Colors';
import ImagePath from '../../constants/ImagePath';
import MyText from '../../components/MyText';
import MyImage from '../../components/MyImage';
import FontFamily from '../../constants/FontFamily';
import LastMessage from '../../components/LastMessage';

export default function ChatHeader({
  chat,
  onPressLeft,
  isLeftImage = true,
  style = {},
  onPhoneCall = () => {},
  onVideoCall = () => {},
}) {
  const navigation = useNavigation();

  return (
    <View style={{...styles.container, ...style}}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        {isLeftImage ? (
          <TouchableOpacity
            style={{marginRight: moderateScale(16)}}
            onPress={!!onPressLeft ? onPressLeft : () => navigation.goBack()}>
            <Image
              style={{
                tintColor: Colors.blackColor,
              }}
              source={ImagePath.icBack}
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginHorizontal: moderateScale(10),
          }}>
          <MyImage
            url={
              chat.isGroupChat ? chat.chatImage : chat.users[0].profilePicture
            }
            imageStyle={{width: 40, height: 40, borderRadius: 50}}
          />
          <View>
            <MyText style={{...styles.titleBarStyle}}>
              {chat.isGroupChat ? chat.chatName : chat.users[0].fullName}
            </MyText>
            {chat.lastMessage && (
              <LastMessage
                type={chat.lastMessage.type}
                content={chat.lastMessage.content}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
        <TouchableOpacity onPress={onVideoCall}>
          <Icon name={'videocam-outline'} size={30} color={Colors.grey} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPhoneCall}>
          <Icon name={'call-outline'} size={25} color={Colors.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: moderateScale(60),
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
