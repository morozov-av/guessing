import { io } from 'socket.io-client';
import { SERVER_URI } from '../../constants';
import { v4 as uuid } from 'uuid';

export const chatSocket = io(`${SERVER_URI}/chat`, {
  query: {
    id: uuid()
  }
});
