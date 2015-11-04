'use strict';

const _ = require('lodash');

const db = require('../db');
const musics = db.get('music');

class Music {
    static getTagsFromSongs(titles) {
        return musics.find({ title: { $in: titles }}, 'tags')
        .error(console.error)
        .then(songs => _.pluck(songs, 'tags'))
        .then(_.flatten);
    }

    static getSongsFromTags(tags) {
        return musics.find({ tags: { $in: tags }}, 'title')
        .error(console.error)
        .then(songs => _.pluck(songs, 'title'))
        .then(_.flatten);
    }
}

module.exports = Music;
