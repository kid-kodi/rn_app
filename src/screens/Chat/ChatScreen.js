import {Alert, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../../components/Screen';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, moderateScale} from '../../styles/ResponsiveSize';
import Colors from '../../constants/Colors';
import {useChat} from '../../contexts/ChatProvider';
import {useUser} from '../../contexts/UserProvider';
import {useSocket} from '../../contexts/SocketProvider';
import DocumentPicker from 'react-native-document-picker';
import ChatHeader from './ChatHeader';
import {showError} from '../../helpers/Utils';
import MessageViewer from '../../components/MessageViewer';
import {BASE_API_URL} from '@env';
import DataItem from '../../components/DataItem';
import NavigationString from '../../constants/NavigationString';
import ChatInput from './ChatInput';

export default function ChatScreen({navigation, route}) {
  const chatId = route?.params?.chatId;

  const socket = useSocket();
  const {user} = useUser();
  const {joinChat, createMessage, messages, chat, removeMessages} =
    useChat();
  // const [message, setMessage] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);
  const [isMultiSelectMode, setMultiSelectMode] = useState(false);
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  // const [isRecording, setIsRecording] = useState(false);

  // Toggle selection of items
  const toggleSelection = item => {
    setSelectedItems(prev => {
      const alreadySelected = prev.find(i => i._id === item._id);
      if (alreadySelected) {
        return prev.filter(i => i._id !== item._id); // Remove from selection
      } else {
        return [...prev, item]; // Add to selection
      }
    });
  };

  // Handle long press to enable multi-select mode
  const handleLongPress = item => {
    setMultiSelectMode(true);
    toggleSelection(item); // Select the item
  };

  // Bulk delete selected items
  const handleDelete = () => {
    if (selectedItems.length === 0) return;

    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${selectedItems.length} item(s)?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeMessages(selectedItems);
            setSelectedItems([]);
            setMultiSelectMode(false);
          },
        },
      ],
    );
  };

  // Exit multi-select mode
  const cancelMultiSelect = () => {
    setSelectedItems([]);
    setMultiSelectMode(false);
  };

  const sendMessage = async msg_data => {
    await createMessage(chatId, msg_data);
  };

  // const handlePickFile = async () => {
  //   try {
  //     const [picked] = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     console.log(
  //       `[Log]  File picked: URI: ${picked.uri}, Type: ${picked.type}, Name: ${picked.name}, Size: ${picked.size}`,
  //     );

  //     const response = await uploadFile({
  //       fileName: picked.name.split('.')[0],
  //       name: picked.name,
  //       fileType: picked.type,
  //       path: picked.uri,
  //     });

  //     await createMessage(chatId, {
  //       content: response.data.name,
  //       file: response.data._id,
  //       type: picked.type,
  //     });
  //   } catch (error) {
  //     showError(error.message);
  //   }
  // };

  // const handlePickEmoji = emoji => {
  //   setMessage(prevMessage => prevMessage + emoji);
  // };
  // const handleRecordAudio = () => {};

  const renderMessage = ({item}) => {
    const isMyMessage = item.sender._id === user._id;

    const isSelected = selectedItems.some(sel => sel._id === item._id);

    return (
      <TouchableOpacity
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
          isSelected && {backgroundColor: '#d3f4ff'},
        ]}
        onLongPress={() => handleLongPress(item)}
        onPress={() => isMultiSelectMode && toggleSelection(item)}>
        <MessageViewer
          mimeType={item.type}
          content={item.content}
          fileUrl={
            item.file ? {uri: `${BASE_API_URL}/image/${item.file.name}`} : null
          }
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      if (chatId) {
        await joinChat(chatId);
      }
    })();
  }, [chatId]);

  const leaveRoom = () => {
    socket.emit('leave_room', chatId);
    navigation.goBack();
  };

  useEffect(() => {
    if (!chatId) return;
    socket.emit('join_room', chatId);
  }, [chatId]);

  const onPhoneCall = () => {
    navigation.navigate(NavigationString.CALL_SCREEN, {
      audio: true,
      video: false,
      chatId,
    });
  };

  const onVideoCall = () => {
    navigation.navigate(NavigationString.CALL_SCREEN, {
      audio: true,
      video: false,
      chatId,
    });
  };

  return (
    <Screen>
      {!isMultiSelectMode && chat && (
        <ChatHeader
          chat={chat}
          onPhoneCall={onPhoneCall}
          onVideoCall={onVideoCall}
          onPressLeft={leaveRoom}
        />
      )}
      {isMultiSelectMode && (
        <View style={{paddingHorizontal: moderateScale(16)}}>
          <DataItem
            icon={'close'}
            title={`${selectedItems.length} messages selectionne`}
            subTitle={`Conversation`}
            onPress={cancelMultiSelect}
          />
        </View>
      )}
      {/* Message List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item._id}
        inverted // Ensures the latest message appears at the bottom
        contentContainerStyle={styles.messageList}
      />

      {!isMultiSelectMode && (
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handlePickFile} style={styles.roundButton}>
            <Icon name="add-sharp" size={20} color={Colors.blackOpacity40} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
          />
          {message.length === 0 && (
            <>
              <TouchableOpacity
                onPress={() => setIsRecording(!isRecording)}
                style={styles.roundButton}>
                <Icon name="mic" size={20} color={Colors.blackOpacity40} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowEmojiPicker(!showEmojiPicker)}
                style={styles.roundButton}>
                <Icon name="happy" size={20} color={Colors.blackOpacity40} />
              </TouchableOpacity>
            </>
          )}
          {message.length > 0 && (
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          {showEmojiPicker && <EmojiPicker onEmojiSelected={handlePickEmoji} />}
          {isRecording && (
            <View>
              <Text>Audio Recording</Text>
            </View>
          )}
        </View>
      )}

      {/* Action Buttons */}
      {isMultiSelectMode && (
        <View style={styles.actionBar}>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={cancelMultiSelect}
            style={styles.actionButton}>
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  messageList: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
  },
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 10,
    padding: moderateScale(10),
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.blueLight,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5ea',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: moderateScale(16),
    gap: 5,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedMessage: {
    backgroundColor: '#d1e7dd',
    borderColor: '#0f5132',
    borderWidth: 1,
  },
  modalStyle: {
    backgroundColor: Colors.whiteColor,
    minHeight: moderateScale(height / 4),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
    padding: moderateScale(16),
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
