'use strict';

const chai = require('chai');
const expect = chai.expect;

const testUtils = require('../test-utils');

const User = require('../../lib/model/user');
const controller = require('../../lib/controller/listen');

function resetUsersCollection(callback) {
    return testUtils.resetDbCollection('users', callback);
}

describe('CONTROLLER: Listen', () => {
    beforeEach(done => resetUsersCollection(done));

    after(done => resetUsersCollection(done));

    it('should take note of what music the user has listened to', done => {
        const usernameA = 'a';
        const userA = new User(usernameA);
        const songTitle = 'm1';

        userA.getSongsListenedTo()
        .then(list => expect(list).to.be.empty)
        .then(controller.listen.bind(controller, usernameA, songTitle))
        .then(userA.getSongsListenedTo.bind(userA))
        .then(list => expect(list).to.contain(songTitle))
        .then(done.bind(done, null), done);
    });
});
