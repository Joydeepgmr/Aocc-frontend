import io from 'socket.io-client';

class Socket {
    constructor(url, options = {}) {
        this.socket = io(url, {
            transports: ['websocket'],
            ...options,
        });
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }

    emit(event, data, callback) {
        this.socket.emit(event, data, callback);
    }

    off(event, callback) {
        this.socket.off(event, callback);
    }

    disconnect() {
        this.socket.disconnect();
    }

    connect() {
        this.socket.connect();
    }
}

export default Socket;

