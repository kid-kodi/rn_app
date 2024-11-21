//import liraries
import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale, moderateScaleVertical, textScale} from '../styles/ResponsiveSize';
import Colors from '../constants/Colors';
import FontFamily from '../constants/FontFamily';

// create a component
const RoundImage = ({
  image = '',
  size = 80,
  onPress = () => {},
  isStatic = false,
  imageStyle,
}) => {
  let compImg = isStatic ? image : {uri: image};
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: moderateScale(size),
        width: moderateScale(size),
        borderRadius: moderateScale(size / 2),
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.grey,
        ...imageStyle,
      }}>
      {!!image ? (
        <Image
          style={{
            height: moderateScale(size),
            width: moderateScale(size),
            borderRadius: moderateScaleVertical(size / 2),
          }}
          source={compImg}
        />
      ) : (
        <Text style={styles.textStyle}>add photo</Text>
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  textStyle: {
    fontSize: textScale(12),
    fontFamily: FontFamily.medium,
    color: Colors.blueLight,
  },
});

//make this component available to the app
export default RoundImage;
