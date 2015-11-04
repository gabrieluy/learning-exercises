'use strict';

const db = require('../db');
const users = db.get('users');

const Music = require('./music');

const FromFolloweesByTagEngine = require('../recommendation-engines/from-followees-by-tag');

class User {
    constructor(username) {
        this.username = username;
    }

    getFollowees() {
        const followerUsername = this.username;

        return users.findOne({ username: followerUsername }, 'followees')
        .error(console.error)
        .then(user => {
            if (!user) {
                return Promise.reject(new Error(`User '${followerUsername}' not found`));
            }
            return user.followees || []
        });
    }

    follow(followeeUser) {
        const followerUsername = this.username;
        const followeeUsername = followeeUser.username;

        return users.findAndModify({
            query: { username: followerUsername },
            update: { $addToSet: { followees: followeeUsername } },
            upsert: true
        })
        .error(console.error)
        .then(result => {
            if (!result) {
                return Promise.reject(new Error(`User '${followerUsername}' not found`));
            }
        });
    }

    getSongsListenedTo() {
        const username = this.username;

        return users.findOne({ username }, 'listenedTo')
        .error(console.error)
        .then(user => {
            if (!user) {
                return Promise.reject(new Error(`User '${username}' not found`));
            }
            return user.listenedTo || []
        });
    }

    listenTo(songTitle) {
        const username = this.username;

        return users.findAndModify({
            query: { username },
            update: { $push: { listenedTo: songTitle } },
            upsert: true
        })
        .error(console.error)
        .then(result => {
            if (!result) {
                return Promise.reject(new Error(`User '${username}' not found`));
            }
        });
    }

    getTagsListenedTo() {
        return this.getSongsListenedTo()
        .then(Music.getTagsFromSongs)
    }

    getRecommendations() {
        const fromFolloweesByTagEngine = new FromFolloweesByTagEngine(this);

        return fromFolloweesByTagEngine.getRecommendations();
    }
}

module.exports = User;
