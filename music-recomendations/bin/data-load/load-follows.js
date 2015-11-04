'use strict';

const app = require('../../lib/app');
const db = require('../../lib/db');

const api = require('supertest').agent(app.listen());
const ENDPOINT_ROOT = '/follow';

const async = require('async');

const isFromCommandLine = !module.parent;
const log = require('../../lib/logger')

////////////////
// Follows data:
////////////////

function loadFollowData(callback) {
    log('=> Posting follow data to /follow endpoint:');

    let followOperations;
    try {
        // Read and parse JSON in one go:
        followOperations = require('../data-load/json-samples/follows.json');
        followOperations = followOperations.operations;
    } catch (err) {
        console.error('Error reading JSON:', err);
        return callback(err);
    }

    async.each(followOperations, (op, callback) => {
        const from = op[0];
        const to = op[1];

        api.post(ENDPOINT_ROOT)
        .send({ from, to })
        .expect(200)
        .end(callback);
    }, err => {
        if (err) {
            return callback(err);
        }
        callback(null);
        log(`   Posted ${followOperations.length} items to /follow sucessfully`);
    });
}

// If being run from command line, execute right away,
// Otherwise, will be imported as a regular module
if (isFromCommandLine) {
    return loadFollowData(db.close.bind(db));
}

module.exports = loadFollowData;
