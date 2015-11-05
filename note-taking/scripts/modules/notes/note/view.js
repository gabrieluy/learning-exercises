'use strict';

var Marionette = require('backbone.marionette');
var template = require('./template.html');
var NoteCollection = require('../list/collection');

module.exports = Marionette.ItemView.extend({
    template: template,

    collection: NoteCollection,

    className: 'js-single-note',

    initialize: function (options) {
        this.noteId = options && options.noteId;
        this.model = NoteCollection.get(this.noteId);
    },

    ui: {
        'removeButton': '.js-remove-note',
        'closeButton': '.js-close-note'
    },

    events: {
        'click @ui.removeButton': 'onRemoveNote',
    },

    triggers: {
        'click @ui.closeButton': 'singleNote:close'
    },

    onRemoveNote: function () {
        this.collection.remove(this.model);
        this.collection.sync('update', this.collection);
        this.trigger('singleNote:close');
    }
});
