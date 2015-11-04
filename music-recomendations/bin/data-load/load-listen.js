'use strict';

const app = require('../../lib/app');
const db = require('../../lib/db');

const api = require('supertest').agent(app.listen());
const ENDPOINT_ROOT = '/listen';

const async = require('async');

const isFromCommandLine = !module.parent;
const log = require('../../lib/logger')

///////////////
// Listen data:
///////////////

function loadListenData(callback) {
    log('=> Posting listen data to /listen endpoint:');

    let listenOperations;
    try {
        // Read and parse JSON in one go:
        listenOperations = require('../data-load/json-samples/listen.json');
        listenOperations = listenOperations.userIds;
    } catch (err) {
        console.error('Error reading JSON:', err);
        return callback(err);
    }

    const listenedToArray = [];
    for (let userId in listenOperations) {
        if (listenOperations.hasOwnProperty(userId)) {
            const songsListenedTo = listenOperations[userId];
            songsListenedTo.forEach(item => {
                listenedToArray.push([userId, item]);
            })
        }
    }

    async.each(listenedToArray, (op, callback) => {
        const user = op[0];
        const music = op[1];

        api.post(ENDPOINT_ROOT)
        .send({ user, music })
        .expect(200)
        .end(callback);
    }, err => {
        if (err) {
            return callback(err);
        }
        callback(null);
        log(`   Posted ${listenedToArray.length} items to /listen sucessfully`);
    });
}

// If being run from command line, execute right away,
// Otherwise, will be imported as a regular module
if (isFromCommandLine) {
    return loadListenData(db.close.bind(db));
}

module.exports = loadListenData;
