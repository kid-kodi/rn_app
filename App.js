import React from 'react';

import UserProvider from './src/contexts/UserProvider';
import ApiProvider from './src/contexts/ApiProvider';
import RootNavigator from './src/navigations/RootNavigator';
import FlashMessage from 'react-native-flash-message';
import ChatProvider from './src/contexts/ChatProvider';
import SocketProvider from './src/contexts/SocketProvider';

export default function App() {
  return (
    <ApiProvider>
      <SocketProvider>
        <UserProvider>
          <ChatProvider>
            <RootNavigator />
            <FlashMessage position="top" />
          </ChatProvider>
        </UserProvider>
      </SocketProvider>
    </ApiProvider>
  );
}
