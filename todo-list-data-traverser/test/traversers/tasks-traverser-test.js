'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const JsonHandler = require('../../lib/util/json-handler');
const DataTransformer = require('../../lib/data-transformer');
const traverseTasks = require('../../lib/traversers/tasks-traverser');
const GOOD_FILE = './test/fixtures/folders_lists_and_tasks.json';

describe('TASKS TRAVERSER', () => {
    let testData;

    before(() => {
        testData = JsonHandler
        .fromJsonFile(GOOD_FILE)
        .then(DataTransformer.prepareData)
        .then(traverseTasks);

        return testData;
    });

    it('should sort tasks according to `task_positions.value` array', () => {
        testData.then(data => {
            // Find Movies do watch list and confirm its tasks are in correct order:
            const moviesToWatchList = data.lists.find(list => list.id === 204550507);

            expect(moviesToWatchList.children[0]).title.to.equal('Citizen Kane');
            expect(moviesToWatchList.children[1]).title.to.equal('The Shawshank Redemption');
            expect(moviesToWatchList.children[2]).title.to.equal('Precious');
            expect(moviesToWatchList.children[3]).title.to.equal('Eternal sunshine of the spotless mind');
        });
    });
});
