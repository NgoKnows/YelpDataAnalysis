import socketClient from 'socket.io-client';

export default function setupRealtime(store, actions) {
    const io = socketClient();

    io.on('event-change', (change) => {
        const count = store.getState().getIn(['game', 'count']);
        let type;
        if(change.new_val.correct === "true") {
            type = 'correct';
        } else {
            type = 'incorrect'
        }

        const newCount = count.update(type, (value) => {
            return value + 1
        });


        store.dispatch(actions.setCorrectCount(newCount))
    });
    return io;
}