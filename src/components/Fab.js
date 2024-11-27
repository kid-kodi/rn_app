import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Fab(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Icon name={props.icon} size={35} color={props.color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#26653A',
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 60,
    width: 60,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
