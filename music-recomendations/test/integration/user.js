'use strict';

const chai = require('chai');
const expect = chai.expect;

const testUtils = require('../test-utils');

const User = require('../../lib/model/user');

const noop = () => {};

function resetUsersCollection(callback) {
    return testUtils.resetDbCollection('users', callback);
}

describe('MODEL: User', () => {
    beforeEach(done => resetUsersCollection(done));

    after(done => resetUsersCollection(done));

    describe('Follow action', () => {
        it('should error when a user is not found', done => {
            const userA = new User('will-not-exist-in-db');
            const userB = new User('may-or-not-exist');

            userA.follow(userB)
            .then(noop, err => expect(err).not.to.be.null)
            .then(done.bind(done, null), done);
        });

        it('should make user `a` follow `b`', done => {
            const usernameA = 'a';
            const usernameB = 'b';
            const userA = new User(usernameA);
            const userB = new User(usernameB);

            userA.getFollowees()
            .then(followees => expect(followees).to.not.contain(usernameB))
            .then(userA.follow.bind(userA, userB))
            .then(userA.getFollowees.bind(userA))
            .then(followees => expect(followees).to.contain(usernameB))
            .then(done.bind(done, null), done);
        });
    });

    describe('Get followees', () => {
        it('should error when a user is not found', done => {
            const userA = new User('will-not-exist-in-db');

            userA.getFollowees()
            .then(noop, err => expect(err).not.to.be.null)
            .then(done.bind(done, null), done);
        });
    });

    describe('Listened to action', () => {
        it('should error when a user is not found', done => {
            const userA = new User('will-not-exist-in-db');

            userA.listenTo('some-music')
            .then(noop, err => expect(err).not.to.be.null)
            .then(done.bind(done, null), done);
        });
    });

    describe('Get songs listened to', () => {
        it('should error when a user is not found', done => {
            const userA = new User('will-not-exist-in-db');

            userA.getSongsListenedTo()
            .then(noop, err => expect(err).not.to.be.null)
            .then(done.bind(done, null), done);
        });
    });
});
