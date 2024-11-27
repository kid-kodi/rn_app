import {createContext, useContext} from 'react';
import SocketClient from '../helpers/SocketClient';

const SocketContext = createContext();

export default function SocketProvider({children}) {
  const socket = new SocketClient();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
