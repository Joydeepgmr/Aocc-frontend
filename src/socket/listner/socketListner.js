import { useEffect } from 'react';
import { SOCKET_EVENT_NAME } from '../../api';
import { useSocket } from '../socketContext';

const SocketEventListener = ({ refetch, apiName }) => {
    const socket = useSocket();
    useEffect(() => {
        const socketEventCallback = (data) => {
            console.log("socket is listing.....");
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
