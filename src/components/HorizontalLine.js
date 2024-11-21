import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

export default function HorizontalLine ({
    lineStyle ={}
}){
    return (
        <View style={{...styles.lineStyle, ...lineStyle}}  />
    );
};

// define your styles
const styles = StyleSheet.create({
    lineStyle: {
      borderBottomWidth: 0.6,
      borderBottomColor: Colors.grey,
      height: 1
    },
});