import { io } from 'socket.io-client';
import { SERVER_URI } from '../../constants';
import { v4 as uuid } from 'uuid';

export const roundSocket = io(`${SERVER_URI}/round`, {
  query: {
    id: uuid()
  }
});
