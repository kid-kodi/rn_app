import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

export default function TextButton({
  text,
  pressEvent,
  containerStyle = null,
  fontStyle = buttonStyle.normalText,
}) {
  return (
    <TouchableOpacity
      onPress={pressEvent}
      style={[containerStyle, {alignSelf: 'flex-start'}]}>
      <View style={buttonStyle.normalButtonView}>
        <Text style={[fontStyle, {textAlign: 'center'}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const buttonStyle = StyleSheet.create({
  img: {
    width: 130,
    height: 40,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  normalButtonView: {
    backgroundColor: null,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
  },
  normalText: {
    color: Colors.green,
    fontSize: 17,
  },
  flashButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
