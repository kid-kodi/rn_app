import React from 'react';
import {Image, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePath from '../constants/ImagePath';
import {BASE_API_URL} from '@env';
import Colors from '../constants/Colors';

export default function MyImage({url, imageStyle = {}}) {

  const source = url
    ? {uri: `${BASE_API_URL}/image/${url}`}
    : ImagePath.icDefaultProfile;

   
  return (
    <Image
      style={{...styles.imageStyle, ...imageStyle}}
      source={source}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth:1,
    borderColor:Colors.gray7
  },
});
