import r from 'rethinkdb'
import config from '../config.json'

function connect() {
    return r.connect(config);
}

export function liveUpdates(io) {
    console.log('Setting up live updates...');
    connect()
    .then((conn) => {
        r
            .table('guesses')
            .changes()
            .run(conn, (err, cursor) => {
                console.log('Listening for changes...')
                cursor.each((err, change) => {
                    console.log('Change detected', change)
                    io.emit('event-change', change)
                })
        })
    })
}

export function getGuesses() {
    return connect()
        .then((conn) => {
            return r
                .table('guesses')
                .run(conn)
                .then((cursor) => cursor.toArray())
        })
}

export function addGuess(correct) {
    return connect()
        .then((conn) => {
            return r
                .table('guesses')
                .insert({correct})
                .run(conn)
        })
}
