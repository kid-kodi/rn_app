import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontFamily from '../constants/FontFamily';
import {textScale} from '../styles/ResponsiveSize';
import Colors from '../constants/Colors';
import {getMessageType} from '../helpers/FileHelpers';

export default function LastMessage({type, content}) {
  const messageType = getMessageType(type);
  switch (messageType) {
    case 'text':
      return <Text style={styles.text}>{content}</Text>;

    case 'image':
      return (
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icon name="image" size={13} color={Colors.blackColor} />
          <Text style={styles.text}>{content}</Text>
        </View>
      );

    case 'video':
      return (
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icon name="video" size={13} color={Colors.blackColor} />
          <Text style={styles.text}>{content}</Text>
        </View>
      );

    case 'audio':
      return (
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icon name="mic" size={13} color={Colors.blackColor} />
          <Text style={styles.text}>{content}</Text>
        </View>
      );

    case 'file':
      return (
        <View style={{flexDirection: 'row', gap: 5}}>
          <Icon name="file" size={13} color={Colors.blackColor} />
          <Text style={styles.text}>{content}</Text>
        </View>
      );

    default:
      return <Text style={styles.text}>{content}</Text>;
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: textScale(13),
    fontFamily: FontFamily.regular,
    color: Colors.blackColor,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  video: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  audio: {
    fontSize: 14,
    color: '#007bff',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileThumbnail: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#007bff',
  },
  unknown: {
    fontSize: 14,
    color: '#888',
  },
});
