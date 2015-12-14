'use strict';

const fs = require('fs');

class JsonHandler {
    static fromJsonFile(filePath) {
        return this.readFile(filePath)
        .then(this.parseJson);
    }

    static readFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            });
        });
    }

    static parseJson(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (err) {
            throw new Error(`ERROR parsing JSON: ${err}`);
        }
    }
}

module.exports = JsonHandler;
