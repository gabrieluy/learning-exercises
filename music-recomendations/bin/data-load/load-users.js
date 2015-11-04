'use strict';

const db = require('../../lib/db');

const isFromCommandLine = !module.parent;
const log = require('../../lib/logger')

//////////////
// Users data:
//////////////

function loadUsersData(callback) {
    log('=> Inserting users into the database:');

    return db.get('users').insert([
        { username: 'a' },
        { username: 'b' },
        { username: 'c' },
        { username: 'd' },
        { username: 'e' },
        { username: 'f' }
    ])
    .error(callback)
    .then(result => {
        log('   Users loaded:', result.length);

        callback(null, result);
    });
}

// If being run from command line, execute right away,
// Otherwise, will be imported as a regular module
if (isFromCommandLine) {
    loadUsersData(db.close.bind(db));
}

module.exports = loadUsersData;
