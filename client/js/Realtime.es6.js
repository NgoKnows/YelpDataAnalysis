import socketClient from 'socket.io-client';

export default function setupRealtime(store, actions) {
    const io = socketClient();

    io.on('event-change', (change) => {
        //update ui
        console.log('what the hell it worked!?');
    });
    return io;
}