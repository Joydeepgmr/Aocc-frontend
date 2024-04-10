import { useEffect } from 'react';
import { socket } from '../../app';
const SocketEventListener = ({ refetch, eventName, apiName }) => {
    useEffect(() => {
        const socketEventCallback = (data) => {
            console.log("socket ", apiName, data, apiName === data)
            if (apiName === data) {
                console.log('socket is refetching the api', apiName)
                refetch();
            }
        };
        socket.on(eventName, socketEventCallback);
        return () => {
            socket.off(eventName, socketEventCallback);
        };
    }, [socket, refetch, eventName, apiName]);
    return null;
};

export default SocketEventListener;
