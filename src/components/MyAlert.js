import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { width } from '../styles/ResponsiveSize';
import { TouchableOpacity } from 'react-native';

export default function MyAlert({
  backEvent,
  animationType = 'slide',
  title,
  content = null,
  okButton,
  cancelButton = null,
  visible,
  otherComponent = null,
}) {
  return (
    <Modal
      animationType={animationType}
      visible={visible}
      transparent={true}
      onRequestClose={() => {
        backEvent();
      }}>
      <TouchableOpacity
        style={{flex: 0.8}}
        onPress={() => {
          backEvent();
        }}
      />
      <View style={[styles.alertContainer]}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleFont}>{title}</Text>
        </View>
        {content && (
          <View style={styles.contentContainer}>
            <Text>{content}</Text>
          </View>
        )}
        {otherComponent}
        <View style={styles.buttonPort}>
          <View style={styles.buttonContainer}>{okButton}</View>
          <View style={styles.buttonContainer}>{cancelButton}</View>
        </View>
      </View>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          backEvent();
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
    alertContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: width * 0.7,
        borderRadius: 10,
        elevation: 3,
        padding: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    titleFont: {
        fontSize: 18
    },
    contentContainer: {
        textAlign:"center",
        marginLeft: 5,
        marginRight: 5,
    },
    buttonPort: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 10,
    },
    buttonContainer: {
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
})
