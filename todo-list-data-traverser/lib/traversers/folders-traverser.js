'use strict';

const sortOrderComparator = require('../sort-order-comparator.js');

function traverseFolders(data) {
    data.folders = data.folders.map(folder => {
        // Add missing type so we can differentiate it from other structures later:
        folder.type = 'folder';

        // Add sortOrder based on the first list in it:
        const firstListId = folder.values[0];
        folder.sortOrder = data.list_positions.values.indexOf(firstListId);

        return folder;
    })
    .sort(sortOrderComparator);

    return data;
}

module.exports = traverseFolders;
