import React from 'react';

import UserProvider from './src/contexts/UserProvider';
import ApiProvider from './src/contexts/ApiProvider';
import RootNavigator from './src/navigations/RootNavigator';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <ApiProvider>
      <UserProvider>
        <RootNavigator />
        <FlashMessage position="top" />
      </UserProvider>
    </ApiProvider>
  );
}
