'use strict';

const db = require('../../lib/db');

const isFromCommandLine = !module.parent;
const log = require('../../lib/logger')

//////////////
// Music data:
//////////////

function loadMusicData(callback) {
    log('=> Inserting songs into the database:');

    let songs;
    try {
        // Read and parse JSON in one go:
        songs = require('../data-load/json-samples/music.json');
    } catch (err) {
        console.error('Error reading JSON:', err);
        return callback(err);
    }

    const songsArray = [];
    for (let songTitle in songs) {
        if (songs.hasOwnProperty(songTitle)) {
            const song = {
                title: songTitle,
                tags: songs[songTitle]
            }
            songsArray.push(song);
        }
    }

    return db.get('music').insert(songsArray)
    .error(callback)
    .then(result => {
        log('   Songs loaded:', result.length);

        callback(null, result);
    });
}

// If being run from command line, execute right away,
// Otherwise, will be imported as a regular module
if (isFromCommandLine) {
    loadMusicData(db.close.bind(db));
}

module.exports = loadMusicData;
