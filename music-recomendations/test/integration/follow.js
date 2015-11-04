'use strict';

const chai = require('chai');
const expect = chai.expect;

const testUtils = require('../test-utils');

const User = require('../../lib/model/user');
const controller = require('../../lib/controller/follow');

function resetUsersCollection(callback) {
    return testUtils.resetDbCollection('users', callback);
}

describe('CONTROLLER: Follow', () => {
    beforeEach(done => resetUsersCollection(done));

    after(done => resetUsersCollection(done));

    it('should make user `a` follow `b`', done => {
        const usernameA = 'a';
        const usernameB = 'b';
        const userA = new User(usernameA);

        userA.getFollowees()
        .then(followees => expect(followees).to.not.contain(usernameB))
        .then(controller.follow.bind(controller, usernameA, usernameB))
        .then(userA.getFollowees.bind(userA))
        .then(followees => expect(followees).to.contain(usernameB))
        .then(done.bind(done, null), done);
    });
});
