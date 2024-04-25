import { useEffect } from 'react';
import { socket } from '../../app';
import { SOCKET_EVENT_NAME } from '../../api';

const SocketEventListener = ({ refetch, apiName }) => {
    useEffect(() => {
        const socketEventCallback = (data) => {
            const parsedData = JSON.parse(data);
            if (parsedData?.length) {
                parsedData.forEach((endpoint) => {
                    if (endpoint === apiName) {
                        refetch();
                        return;
                    }
                })
            }
        };
        socket.on(SOCKET_EVENT_NAME, socketEventCallback);
        return () => {
            socket.off(SOCKET_EVENT_NAME, socketEventCallback);
        };
    }, [socket, refetch, apiName]);
    return null;
};

export default SocketEventListener;
