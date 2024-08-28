import React, { createContext, useContext } from 'react';
import Socket from './socket';

const SocketContext = createContext();
const socketPath = process.env.baseURL?.split('/')?.slice(0, 3).join('/');
const options = { path: '/frms/socket' }; // Optional options for Socket.IO
const socket = new Socket(socketPath, options);
export const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
);

export const useSocket = () => {
    return useContext(SocketContext);
};
