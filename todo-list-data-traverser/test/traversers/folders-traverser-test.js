'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const JsonHandler = require('../../lib/util/json-handler');
const DataTransformer = require('../../lib/data-transformer');
const traverseFolders = require('../../lib/traversers/folders-traverser');
const GOOD_FILE = './test/fixtures/folders_lists_and_tasks.json';

describe('FOLDER TRAVERSER', () => {
    let testData;

    before(() => {
        testData = JsonHandler
        .fromJsonFile(GOOD_FILE)
        .then(DataTransformer.prepareData)
        .then(traverseFolders);

        return testData;
    });

    it('should sort folders by the position of their first list', () => {
        return testData.then(data => {
            const folders = data.folders;
            expect(folders[0]).to.have.any.keys({ title: 'At home', sortOrder: 1 });
            expect(folders[1]).to.have.any.keys({ title: 'At work', sortOrder: 4 });
            expect(folders[2]).to.have.any.keys({ title: 'Trip to Argentina', sortOrder: 8 });
        });
    });
});
