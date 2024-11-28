import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {showError} from '../../helpers/Utils';
import {useChat} from '../../contexts/ChatProvider';
import EmojiPicker from 'rn-emoji-keyboard';
import AudioRecorder from '../../components/AudioRecorder';

const stickers = [
  {id: 1, uri: 'https://example.com/sticker1.png'},
  {id: 2, uri: 'https://example.com/sticker2.png'},
  {id: 3, uri: 'https://example.com/sticker3.png'},
  // Ajoutez vos propres stickers ici
];

export default function ChatInput({onSend}) {
  const [message, setMessage] = useState('');
  const [recording, setRecording] = useState(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [stickerPickerVisible, setStickerPickerVisible] = useState(false);

  const {uploadFile} = useChat();

  const handleSend = () => {
    if (message.trim()) {
      onSend({type: 'text', content: message});
      setMessage('');
    }
  };

  const handlePickFile = async () => {
    try {
      const [picked] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      console.log(
        `[Log]  File picked: URI: ${picked.uri}, Type: ${picked.type}, Name: ${picked.name}, Size: ${picked.size}`,
      );

      const response = await uploadFile({
        fileName: picked.name.split('.')[0],
        name: picked.name,
        fileType: picked.type,
        path: picked.uri,
      });

      onSend({type: picked.type, content: response.data.name});
    } catch (error) {
      showError(error.message);
    }
  };

  const handleStartRecording = async () => {
    try {
      //   const { granted } = await Audio.requestPermissionsAsync();
      //   if (!granted) return alert("Permission denied for microphone");

      //   const { recording } = await Audio.Recording.createAsync(
      //     Audio.RecordingOptionsPresets.HIGH_QUALITY
      //   );
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const handleStopRecording = async () => {
    try {
      //   await recording.stopAndUnloadAsync();
      //   const uri = recording.getURI();
      //   setRecording(null);
      //   onSend({ type: "audio", content: uri });
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  const handleEmojiSelect = emoji => {
    setMessage(prev => prev + emoji.emoji);
    setEmojiPickerVisible(false);
  };

  const handleStickerSelect = sticker => {
    onSend({type: 'sticker', content: sticker.uri});
    setStickerPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setStickerPickerVisible(true)}
        style={styles.iconButton}>
        <Icon name="insert-photo" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setEmojiPickerVisible(true)}
        style={styles.iconButton}>
        <Icon name="emoji-emotions" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePickFile} style={styles.iconButton}>
        <Icon name="attach-file" size={24} color="gray" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Tapez votre message..."
        value={message}
        onChangeText={setMessage}
      />
      {message.length > 0 && (
        <TouchableOpacity onPress={handleSend} style={styles.iconButton}>
          <Icon
            name="send"
            size={24}
            color={message.trim() ? 'blue' : 'gray'}
          />
        </TouchableOpacity>
      )}

      {message.length === 0 && <AudioRecorder onSend={onSend} />}

      {/* {message.length === 0 && recording && (
        <TouchableOpacity
          onPress={handleStopRecording}
          style={styles.iconButton}>
          <Icon name="stop" size={24} color="red" />
        </TouchableOpacity>
      )} */}
      {/* {message.length === 0 && !recording && (
        <TouchableOpacity
          onPress={handleStartRecording}
          style={styles.iconButton}>
          <Icon name="mic" size={24} color="gray" />
        </TouchableOpacity>
      )} */}

      {/* Emoji Picker */}
      <EmojiPicker
        onEmojiSelected={handleEmojiSelect}
        open={emojiPickerVisible}
        onClose={() => setEmojiPickerVisible(false)}
      />

      {/* Sticker Picker */}
      <Modal visible={stickerPickerVisible} animationType="slide">
        <View style={styles.stickerContainer}>
          <FlatList
            data={stickers}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleStickerSelect(item)}>
                <Image source={{uri: item.uri}} style={styles.stickerImage} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setStickerPickerVisible(false)}>
            <Icon name="close" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  iconButton: {
    padding: 8,
  },
  stickerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  stickerImage: {
    width: 80,
    height: 80,
    margin: 8,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
});
