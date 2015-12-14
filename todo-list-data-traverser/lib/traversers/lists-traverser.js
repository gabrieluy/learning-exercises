'use strict';

const sortOrderComparator = require('../sort-order-comparator');

function traverseLists(data) {
    return Promise.resolve(data)
    .then(insertOrderIntoLists)
    .then(traverseFoldersLists)
    .then(traverseRootLists);
}

function traverseFoldersLists(data) {
    data.output = data.folders.map(folder => {
        folder.children = folder.values.map(listId => {
            return data.lists.find((list, index) => {
                if (list.id === listId) {
                    // Flag this list as already traversed so we can skip it later:
                    list.traversed = true;
                    data.lists[index] = list;

                    return true;
                }
                return false;
            });
        }).sort(sortOrderComparator);

        return folder;
    });

    return data;
}

function traverseRootLists(data) {
    const rootLists = data.lists.filter(list => !list.traversed);
    data.output = data.output.concat(rootLists);

    return data;
}

function insertOrderIntoLists(data) {
    data.lists = data.lists.map(list => {
        list.sortOrder = data.list_positions.values.indexOf(list.id);
        return list;
    });

    return data;
}
module.exports = traverseLists;
