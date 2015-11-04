'use strict';

const db = require('../lib/db');

const loadAllData = require('../bin/data-load');
const log = require('../lib/logger');

class TestUtils {
    dropDbCollection(collectionName, callback) {
        log(`=> Dropping collection ${collectionName}`);

        db.get(collectionName)
        .drop(err => {
            // Known bug: some mongo clients don't ignore
            if (err && err.errmsg !== 'ns not found') {
                 return callback(err);
            }
            return callback(null)
        });
    }

    loadDbCollection(collectionName, callback) {
        require(`../bin/data-load/load-${collectionName}`)(callback);
    }

    resetDbCollection(collectionName, callback) {
        this.dropDbCollection(collectionName, () => {
            this.loadDbCollection(collectionName, callback);
        });
    }

    loadAllData(callback) {
        loadAllData(callback);
    }
}

module.exports = new TestUtils();
