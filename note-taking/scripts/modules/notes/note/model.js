'use strict';

var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var _ = require('underscore');
var NoteCollection = require('../list/collection');

module.exports = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('NotesStorage'),

    // Necessary so .sync() can work
    collection: NoteCollection,

    defaults: function () {
        return {
            title: 'Get me done',
            description: 'You may use GTD or Pomodoro... :)'
        };
    },

    validate: function (attributes) {
        if (attributes.title === '' || attributes.description === '') {
            return 'Note to (your)self: write a note when writing a note!';
        }
    }
}, {
    generateUniqueId: function () {
        return _.uniqueId();
    }
});
