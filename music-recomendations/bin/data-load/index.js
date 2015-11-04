'use strict';

const db = require('../../lib/db');
const async = require('async');
const isFromCommandLine = !module.parent;

// Invoke this file via command line
// You probably don't want it to invoke all loaders via node at the same time...
const loadUsers = require('./load-users');
const loadFollows = require('./load-follows');
const loadMusic = require('./load-music');
const loadListen = require('./load-listen');

function loadAllData(callback) {
    async.series([
        loadUsers,
        loadFollows,
        loadMusic,
        loadListen
    ], err => {
        if (err) {
            console.error('Failed to load all the data:', err);
        }
        callback(err);
    });
}

// If being run from command line, execute right away,
// Otherwise, will be imported as a regular module
if (isFromCommandLine) {
    return loadAllData(db.close.bind(db, () => process.exit()));
}

module.exports = loadAllData;

