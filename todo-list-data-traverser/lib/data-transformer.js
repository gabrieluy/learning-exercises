'use strict';

const traverseTasks = require('./traversers/tasks-traverser');
const traverseFolders = require('./traversers/folders-traverser');
const traverseLists = require('./traversers/lists-traverser');
const sortOrderComparator = require('./sort-order-comparator');
const dataTreeToPlainText = require('./util/plain-text-tree');

class DataTransformer {
    constructor(rawData) {
        this.rawData = rawData;
        this.data = this.rawData.then(DataTransformer.prepareData);

        return this;
    }

    transform() {
        return this.data
        .then(traverseTasks)
        .then(traverseFolders)
        .then(traverseLists)
        .then(cleanupStructure)
        .then(sortBySortOrderField)
        .then(dataTreeToPlainText);
    }

    static prepareData(originalData) {
        // Making `data` property our root element:
        const data = originalData.data;
        data.output = [];

        return data;
    }
}

function sortBySortOrderField(data) {
    return data.sort(sortOrderComparator);
}

function cleanupStructure(data) {
    return data.output;
}

module.exports = DataTransformer;
