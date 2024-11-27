import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';

import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default function AudioPlayer({audioUrl, fileName}) {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Play the audio
  const playAudio = () => {
    if (player) {
      player.play(success => {
        if (success) {
          console.log('Finished playing');
          setIsPlaying(false);
        } else {
          console.log('Playback failed');
        }
      });
      setIsPlaying(true);
    } else {
      const sound = new Sound(audioUrl.uri, null, error => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        sound.play(success => {
          if (success) {
            console.log('Finished playing');
            setIsPlaying(false);
          } else {
            console.log('Playback failed');
          }
        });
        setPlayer(sound);
        setIsPlaying(true);
      });
    }
  };

  // Pause the audio
  const pauseAudio = () => {
    if (player) {
      player.pause();
      setIsPlaying(false);
    }
  };

  // Stop the audio
  const stopAudio = () => {
    if (player) {
      player.stop(() => {
        console.log('Stopped playing');
      });
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fileName}</Text>
      {!isPlaying && (
        <TouchableOpacity style={styles.button} onPress={playAudio}>
          <Icon name='play-circle' size={20} color={Colors.whiteColor}/>
        </TouchableOpacity>
      )}
      {isPlaying && (
          <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.button} onPress={pauseAudio}>
            <Icon name='pause-circle' size={20} color={Colors.whiteColor}/>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopAudio}>
          <Icon name='stop-circle' size={20} color={Colors.whiteColor}/>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14
  },
  button: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
