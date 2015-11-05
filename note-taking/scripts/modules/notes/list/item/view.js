'use strict';

var Marionette = require('backbone.marionette');
var NoteCollection = require('../collection');
var template = require('./template.html');

module.exports = Marionette.ItemView.extend({
    tagName: 'li',

    className: 'note-item',

    collection: NoteCollection,

    template: template
});
