'use strict';

var Backbone = require('backbone');
var NoteModel = require('../note/model');
Backbone.LocalStorage = require('backbone.localstorage');

module.exports = new (Backbone.Collection.extend({
    model: NoteModel,

    localStorage: new Backbone.LocalStorage('NotesStorage'),

    initialize: function () {
        // Pre-populating localStorage/collection:
        this.reset([
            { id: 1, title: 'Task #1', description: 'Desc 1' },
            { id: 2, title: 'Task #2', description: 'Desc 2' },
            { id: 3, title: 'Task #3', description: 'Desc 3' },
            { id: 4, title: 'Task #4', description: 'Desc 4' },
            { id: 5, title: 'Task #5', description: 'Desc 5' },
            { id: 6, title: 'Task #6', description: 'Desc 6' },
            { id: 7, title: 'Task #7', description: 'Desc 7' },
            { id: 8, title: 'Task #8', description: 'Desc 8' },
            { id: 9, title: 'Task #9', description: 'Desc 9' },
            { id: 10, title: 'Task #10', description: 'Desc 10' }
        ]);
        this.sync('update', this);
    },

    comparator: function (model) {
        return -model.get('id');
    }
}))();
