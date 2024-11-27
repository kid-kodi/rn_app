import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getMessageType} from '../helpers/FileHelpers';
import ImageViewer from './ImageViewer';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import FileDownloader from './FileDownloader';

export default function MessageViewer(message) {
  const {mimeType, content, fileUrl} = message;

  const messageType = getMessageType(mimeType);

  switch (messageType) {
    case 'text':
      return <Text style={styles.text}>{content}</Text>;
    case 'image':
      return <ImageViewer imageUrl={fileUrl} fileName={content} />;
    case 'audio':
      return <AudioPlayer audioUrl={fileUrl} fileName={content} />;
    case 'video':
      return <VideoPlayer videoUrl={fileUrl} fileName={content} />;
    case 'document':
      return (
        <FileDownloader
          fileUrl={fileUrl}
          fileName={content}
          mimeType={mimeType}
        />
      );
    default:
      return (
        <View style={styles.unknownContainer}>
          <Text>Message non pris en charge.</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  unknownContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
