'use strict';

const fs = require('fs');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);

const JsonHandler = require('../lib/util/json-handler');
const DataTransformer = require('../lib/data-transformer');
const JSON_FILE = './test/fixtures/folders_lists_and_tasks.json';
const OUTPUT_FILE = './test/fixtures/expected_output.txt';

describe('DATA TRANSFORMER', () => {
    context('Data transformation', () => {
        it('should strip `data` and add an `output` property after reading json', () => {
            const rawData = JsonHandler.fromJsonFile(JSON_FILE);
            const data = new DataTransformer(rawData);

            return data.data.then(jsObj => {
                expect(jsObj).to.not.have.any.keys('data');
                expect(jsObj).to.have.any.keys('output');
            });
        });
    });

    context('Final Output Display', () => {
        it('should display the final output according to example file', () => {
            const rawData = JsonHandler.fromJsonFile(JSON_FILE);
            const generatedOutput = new DataTransformer(rawData).transform();
            const fixtureOutput = fs.readFileSync(OUTPUT_FILE, 'utf8').trim();

            return generatedOutput.then(string => {
                expect(string).to.equal(fixtureOutput);
            });
        });
    });
});
