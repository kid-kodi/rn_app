import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function ImageViewer({imageUrl}) {
  return <Image source={{uri: imageUrl}} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
    },
  });
