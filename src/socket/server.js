import { io } from 'socket.io-client';

const serverUrl = process.env.baseURL.split('/').slice(0, 3).join('/');
const options = { transports: ['websocket'] }; // Optional options for Socket.IO

const socket = io(serverUrl, options);

socket.on('connect', () => {
    console.log('socket Connected to server');
});

socket.on('disconnect', () => {
    console.log('socket Disconnected from server');
});

export default socket;
