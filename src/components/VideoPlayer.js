import React from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';

export default function VideoPlayer({videoUrl}) {
    return (
      <View style={styles.videoContainer}>
        <Video
          source={{ uri: videoUrl }}
          controls
          resizeMode="contain"
          style={styles.video}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    videoContainer: {
      width: '100%',
      height: 200,
    },
    video: {
      width: '100%',
      height: '100%',
    },
  });
  