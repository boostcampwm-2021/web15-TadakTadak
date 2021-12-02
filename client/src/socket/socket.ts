import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import 'dotenv/config';

const options: Partial<ManagerOptions & SocketOptions> = {
  secure: true,
};

const socketUrl = process.env.REACT_APP_SOCKET_SERVER_URL || '/';
const socket = io(socketUrl, options);

socket.on('connect', () => {
  console.log('socket connect ✅');

  socket.on('disconnect', () => {
    console.log('socket disconnected ❌');
  });
});

export default socket;
