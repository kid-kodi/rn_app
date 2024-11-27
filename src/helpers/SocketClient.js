import {io} from 'socket.io-client';
import {BASE_API_URL} from '@env';

export default class SocketClient {
  constructor() {
    try {
      this.socket = io(BASE_API_URL);

      this.socket.on('disconnect', data => {
        console.log('=== socket disconnected ===');
      });

      this.socket.on('error', data => {
        console.log('=== socket error ===', data);
      });
    } catch (error) {
      console.log('=== socket is not initialized ===', error);
    }
  }

  initialzeSocket = async userId => {
    try {
      this.socket.on('connect', data => {
        console.log('=== socket connected ===');
        this.socket.emit('user_online', {userId});
      });

      this.socket.emit('join_chat', userId);
    } catch (error) {
      console.log('=== socket is not initialized ===', error);
    }
  };

  on(event, data = {}) {
    this.socket.on(event, data);
  }

  emit(event, cb) {
    this.socket.emit(event, cb);
  }

  async sendRequest(event, cb) {
    const response = await new Promise((resolve) => {
    socket.emit(event, { text: 'Hello Server!' }, resolve);
  });

  console.log('Response from server:', response);
  }

  removeListener(listName) {
    this.socket.removeListener(listName);
  }
}
