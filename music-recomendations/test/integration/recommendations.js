'use strict';

const chai = require('chai');
const expect = chai.expect;

const testUtils = require('../test-utils');

const controller = require('../../lib/controller/recommendations');

describe('CONTROLLER: Recommendations', () => {
    before(testUtils.loadAllData);

    it('should return songs recommendations for a user', done => {
        controller.getRecommendationsFor('b')
        .then(list => expect(list).not.to.be.empty)
        .then(done.bind(done, null), done);
    });
});
