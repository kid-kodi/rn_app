import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import {moderateScale} from '../styles/ResponsiveSize';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState(null);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const audioRecorderPlayer = new AudioRecorderPlayer();

  // Request permissions for Android
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      return (
        granted['android.permission.RECORD_AUDIO'] === 'granted' &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      );
    }
    return true;
  };

  // Start recording
  const startRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Microphone and storage permissions are required to record audio.',
      );
      return;
    }

    setIsRecording(true);
    const path = Platform.select({
      ios: 'audio.m4a',
      android: `${RNFetchBlob.fs.dirs.CacheDir}/${Date.now()}.mp3`,
    });
    const result = await audioRecorderPlayer.startRecorder(path);
    setRecordedFilePath(result);

    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      return;
    });
  };

  // Stop recording
  const stopRecording = async () => {
    setIsRecording(false);
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  // Upload audio file to server
  const uploadAudio = async () => {
    if (!recordedFilePath) {
      Alert.alert('No Audio', 'Please record an audio file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: recordedFilePath,
        name: 'audio.mp3',
        type: 'audio/mpeg',
      });

      // Replace with your server's API endpoint
      const response = await fetch('https://your-server.com/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Upload Success', 'Your audio file has been uploaded.');
        onSendAudio(result.fileUrl); // Pass the audio file URL to the parent chat component
      } else {
        Alert.alert('Upload Failed', result.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to upload audio.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Record Time: {recordTime}</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button
        title="Send Audio"
        onPress={uploadAudio}
        disabled={!recordedFilePath}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
  },
});
