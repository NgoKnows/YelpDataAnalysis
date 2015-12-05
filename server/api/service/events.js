import r from 'rethinkdb'
import config from '../../config.json'

function connect() {
    return r.connect(config);
}

export function liveUpdates(io) {
    console.log('Setting up live updates...');
    connect()
    .then((conn) => {
        r
        .table('guesses')
        .changes().run(conn, (err, cursor) => {
            console.log('Listening for changes...')
            cursor.each((err, change) => {
                console.log('Change detected', change)
                io.emit('event-change', change)
            })
        })
    })
}
