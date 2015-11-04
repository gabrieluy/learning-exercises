'use strict';

const _ = require('lodash');

const music = require('../model/music');

class FromFolloweesByTagEngine {
    constructor(baseUser) {
        this.baseUser = baseUser;
    }

    getRecommendations() {
        return this.getTagsInCommonFromUserAndHisFollowees()
        .then(music.getSongsFromTags)
        .then(this.filterSongsUserHasAlreadyListenedTo.bind(this));
    }

    getTagsInCommonFromUserAndHisFollowees() {
        return Promise.all([
            this.baseUser.getTagsListenedTo(),
            this.getFolloweesTagsListenedTo()
        ])
        .then(tags => _.intersection(tags[0], tags[1]));
    }

    getFolloweesTagsListenedTo() {
        // Avoiding cyclic require:
        const User = require('../model/user');

        return this.baseUser
        .getFollowees()
        .then(followees => Promise.all(followees.map(followee => {
            return new User(followee).getTagsListenedTo();
        })))
        .then(_.flatten)
    }

    filterSongsUserHasAlreadyListenedTo(otherSongs) {
        return this.baseUser
        .getSongsListenedTo()
        .then(baseUserSongs => _.xor(baseUserSongs, otherSongs))
    }
}

module.exports = FromFolloweesByTagEngine;
