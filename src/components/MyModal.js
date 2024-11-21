import {StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

export default function MyModal({
  children,
  isVisible = false,
  onBackdropPress = () => {},
  style = {},
  ...props
}) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={{...styles.style, ...style}}
      {...props}>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  style: {},
});
