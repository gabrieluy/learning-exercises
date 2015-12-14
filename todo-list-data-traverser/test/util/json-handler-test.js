'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const JsonHandler = require('../../lib/util/json-handler');

describe('JSON HANDLER', () => {
    it('should reject the promise if file not found', () => {
        const BAD_FILE = './bad-file.json';
        return expect(JsonHandler.fromJsonFile(BAD_FILE)).to.be.rejected;
    });

    it('should reject the promise on invalid json', () => {
        const BAD_JSON = '{ invalidKey: "foo" }';
        return expect(JsonHandler.parseJson.bind(null, BAD_JSON)).to.throw();
    });

    it('should fulfill the promise if everything went alright', () => {
        const GOOD_FILE = './test/fixtures/folders_lists_and_tasks.json';
        return expect(JsonHandler.fromJsonFile(GOOD_FILE)).to.be.fulfilled;
    });
});
