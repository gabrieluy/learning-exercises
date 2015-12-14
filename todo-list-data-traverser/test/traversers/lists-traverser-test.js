'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const JsonHandler = require('../../lib/util/json-handler');
const DataTransformer = require('../../lib/data-transformer');
const traverseLists = require('../../lib/traversers/lists-traverser');
const traverseFolders = require('../../lib/traversers/folders-traverser');
const sortOrderComparator = require('../../lib/sort-order-comparator');
const GOOD_FILE = './test/fixtures/folders_lists_and_tasks.json';

function sortBySortOrderField(data) {
    data.output = data.output.sort(sortOrderComparator);
    return data;
}

describe('LIST TRAVERSER', () => {
    let testData;

    before(() => {
        testData = JsonHandler
        .fromJsonFile(GOOD_FILE)
        .then(DataTransformer.prepareData)
        .then(traverseFolders)
        .then(traverseLists)
        .then(sortBySortOrderField);

        return testData;
    });

    it('should list a list at root level if they are not inside a folder', () => {
        return testData.then(data => {
            const aRootListId = 204550175;
            const aRootList = data.output.find(node => node.id === aRootListId);
            expect(aRootList).to.exist;
        });
    });

    it('should sort lists according to `list_positions.value` array', () => {
        // Testing if `sortOrder` was included correctly, by samples.
        // Real sorting will be tested in it's own.
        const inboxListId = 204550175;
        const atHomeFolderId = 100001;
        const urgentThingsListId = 204552231;
        return testData.then(data => {
            const output = data.output;
            expect(output[0].id).to.be.equal(inboxListId);
            expect(output[1].id).to.be.equal(atHomeFolderId);
            expect(output[3].id).to.be.equal(urgentThingsListId);
        });
    });

    it('should insert lists in their according folder', () => {
        return testData.then(data => {
            const folders = data.folders;

            // Following id's are extracted from .json fixture file...
            const firstFolderLists = folders[0].children;
            expect(firstFolderLists[0]).to.have.any.key({ id: 204550290 });
            expect(firstFolderLists[1]).to.have.any.key({ id: 204550533 });
            expect(firstFolderLists[2]).to.have.any.key({ id: 204550507 });

            const secondFolderLists = folders[1].children;
            expect(secondFolderLists[1]).to.have.any.key({ id: 204551017 });

            const thirdFolderLists = folders[2].children;
            expect(thirdFolderLists[4]).to.have.any.key({ id: 204552199 });
        });
    });
});
