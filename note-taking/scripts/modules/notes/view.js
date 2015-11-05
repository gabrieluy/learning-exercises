'use strict';

var _ = require('underscore');
// var $ = require('jquery'); // Browserify bug
// var Backbone = require('backbone');
// Backbone.$ = $;
var Marionette = require('backbone.marionette');
var NoteFormView = require('./note/form/view.js');
var NoteListView = require('./list/view.js');
var SingleNoteView = require('./note/view.js');
var template = require('./template.html');

var getPlaceholderView = function() {
    return new Marionette.ItemView({
        tagName: 'p',
        className: 'text-center',
        template: _.template('&laquo; Select a note from the list on the left')
    })
};

module.exports = Marionette.LayoutView.extend({
    template: template,

    initialize: function (options) {
        this.noteId = options && options.noteId;
        this.noteListView = new NoteListView();
        this.addNoteFormView = new NoteFormView();
        this.singleNoteView = getPlaceholderView();
        if (this.hasNoteId()) {
            this.singleNoteView = new SingleNoteView({ noteId: this.noteId });
            this.listenTo(this.singleNoteView, 'singleNote:close', this.closeSingleNote);
        }
    },

    hasNoteId: function () {
        return !!this.noteId;
    },

    regions: {
        addNoteForm: '.add-note-form',
        notesList: '.notes-list',
        singleNote: '.single-note'
    },

    onShow: function () {
        this.notesList.show(this.noteListView);
        this.addNoteForm.show(this.addNoteFormView);
        this.singleNote.show(this.singleNoteView);
    },

    closeSingleNote: function () {
        this.singleNote.show(getPlaceholderView());
        window.NotesTestApp.vent.trigger('navigate', '#/notes');
    }
});
