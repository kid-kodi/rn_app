import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApi} from './ApiProvider';
import {getData, showError, storeData} from '../helpers/Utils';
import queryString from 'query-string';
import {useSocket} from './SocketProvider';

export const UserContext = createContext();

export default function UserProvider({children}) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAccountSet, setIsAccountSet] = useState(false);

  const socket = useSocket();
  const api = useApi();

  const signup = async data => {
    try {
      const response = await api.post(`/api/auth/register`, data);
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const otpActivation = async data => {
    try {
      const response = await api.post(`/api/auth/activation`, data);
      if (response.success) {
        setUser(response.user);
        setIsAuth(true);
        setIsAccountSet(response.user.isAccountSet);
        await storeData('user', response.token);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const editProfile = async data => {
    try {
      const response = await api.put(`/api/auth/me`, data);
      if (response.success) {
        setUser(response.user);
        setIsAccountSet(response.user.isAccountSet);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const login = async data => {
    try {
      const response = await api.post(`/api/auth/login`, data);
      if (response.success) {
        setIsAuth(true);
        setUser(response.user);
        setIsAccountSet(response.user.isAccountSet);
        socket.initialzeSocket(response.user._id);
        await storeData('user', response.token);
      }
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setIsAuth(false);
    setUser(null);
    setIsAccountSet(false);
    socket.emit('leave_chat', user._id);
  };

  const autoLogin = async () => {
    try {
      const response = await api.get(`/api/auth/me`);
      if (response.success) {
        setIsAuth(true);
        setUser(response.user);
        setIsAccountSet(response.user.isAccountSet);
        socket.initialzeSocket(response.user._id);
      }
    } catch (error) {
      setIsAuth(false);
      setUser(null);
      setIsAccountSet(false);
      showError(error.message);
    }
  };

  const uploadPhoto = async image => {
    try {
      const data = new FormData();
      data.append('image', {
        fileName: 'image',
        name: 'image.png',
        type: 'image/png',
        uri:
          Platform.OS == 'android'
            ? image.path
            : image.path.replace('file://', ''),
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

  const searchUsers = async query => {
    try {
      const parser = queryString.stringify(query);
      const response = await api.get(`/api/users/search?${parser}`, null);
      return response;
    } catch (error) {
      showError(error.message);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await api.get(`/api/auth/me`);
  //       console.log(response)
  //       if (response.success) {
  //         setIsAuth(true);
  //         setUser(response.user);
  //         setIsAccountSet(response.user.isAccountSet);
  //       }
  //     } catch (error) {
  //       setIsAuth(false);
  //       setUser(null);
  //       setIsAccountSet(false);
  //     }
  //   })();
  // }, []);

  return (
    <UserContext.Provider
      value={{
        autoLogin,
        isAuth,
        isAccountSet,
        signup,
        otpActivation,
        uploadPhoto,
        editProfile,
        login,
        logout,
        user,
        searchUsers,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
