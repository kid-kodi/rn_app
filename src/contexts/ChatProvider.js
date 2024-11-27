import {createContext, useContext, useEffect, useState} from 'react';
import {useApi} from './ApiProvider';
import {getData, showError, storeData} from '../helpers/Utils';
import {useSocket} from './SocketProvider';
import {useUser} from './UserProvider';

export const ChatContext = createContext();

export default function ChatProvider({children}) {
  const socket = useSocket();
  const api = useApi();
  const {user} = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [chat, setChat] = useState();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const createChat = async data => {
    try {
      const response = await api.post(`/api/chats`, data);
      if (response.success) {
        socket.emit('new_chat', response.data);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const createMessage = async (chatId, msg) => {
    try {
      const response = await api.post(`/api/messages/${chatId}`, msg);
      if (response.success) {
        socket.emit('send_message', response.data);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const getMessages = async chatId => {
    try {
      const response = await api.get(`/api/messages/${chatId}`);
      if (response.success) {
        setMessages(response.messages);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const joinChat = async chatId => {
    try {
      const response = await api.get(`/api/chats/${chatId}`);
      if (response.success) {
        setChat(response.chat);
        await getMessages(chatId);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const uploadFile = async file => {
    // fileName: fileName,
    //     name: fileName.split('.')[0],
    //     fileType: fileType,
    //     path: file.path,
    try {
      const data = new FormData();
      data.append('file', {
        fileName: file.fileName,
        name: file.name,
        type: file.fileType,
        uri:
          Platform.OS == 'android'
            ? file.path
            : file.path.replace('file://', ''),
      });

      let token = await getData('user');

      const response = await api.post('/api/files/upload-img', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (!user) return;

      // get users chats
      try {
        const response = await api.get(
          `/api/chats/?page=${currentPage}&size=10`,
        );

        if (response.success) {
          setChats(response.chats);
        }
        return response;
      } catch (error) {
        showError(error.message);
      }
    })();
  }, [user]);

  // socket listeners
  useEffect(() => {
    socket.on('send_message', data => {
      setMessages(prevMessages => [data, ...prevMessages]);
      // update last chat message

      setChats(prevChats =>
        prevChats.map(item =>
          item._id === data.chat._id ? {...item, lastMessage: data} : item,
        ),
      );
    });

    socket.on('new_chat', chat => {
      setChats(prevData => [chat, ...prevData]);
    });

    return () => {
      socket.removeListener('send_message');
      socket.removeListener('new_chat');
    };
  }, []);

  const toggleSelection = id => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message._id === id
          ? {...message, selected: !message.selected}
          : message,
      ),
    );

    setSelectedMessages(prevItems => {
      // Check if the item is already in the array
      const exists = prevItems.some(i => i === id);
      if (exists) {
        // Remove the item if it exists
        return prevItems.filter(i => i !== id);
      } else {
        // Add the item if it doesn't exist
        return [...prevItems, id];
      }
    });
  };

  const cancelSelection = () => {
    setMessages(prevMessages =>
      prevMessages.map(msg => ({...msg, selected: false})),
    );
    setSelectedMessages([]);
  };

  const removeMessages = async (selectedItems) => {
    // get users chats
    try {
      const response = await api.post(`/api/messages/remove`, {
        ids: selectedItems,
      });

      if (response.success) {
        setMessages(prev =>
          prev.filter(item => !selectedItems.find(sel => sel._id === item._id)),
        );
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const removeChats = async selectedItems => {
    // get users chats
    try {
      const response = await api.post(`/api/chats/remove`, {
        ids: selectedItems,
      });

      if (response.success) {
        setChats(prev =>
          prev.filter(item => !selectedItems.find(sel => sel._id === item._id)),
        );
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        createChat,
        createMessage,
        joinChat,
        messages,
        selectedMessages,
        chats,
        chat,
        uploadFile,
        toggleSelection,
        removeMessages,
        cancelSelection,
        removeChats,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
