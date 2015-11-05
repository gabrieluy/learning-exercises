'use strict';

var NotesModule = require('../modules/notes/module');
var NotesHeaderModule = require('../modules/header/notes/module');

var NOTES_LIST_TITLE = 'Notes: List';
var SINGLE_NOTE_TITLE = 'Notes: Note #';

function TitleFactory(noteId) {
    this.noteId = noteId;
    this.hasNoteId = !!noteId;
}

TitleFactory.prototype.getTitle = function () {
    return this.hasNoteId ? SINGLE_NOTE_TITLE + this.noteId : NOTES_LIST_TITLE;
};

module.exports = function (noteId) {
    var App = window.NotesTestApp;

    NotesModule = App.module('NotesModule', NotesModule);
    NotesHeaderModule = App.module('NotesHeaderModule', NotesHeaderModule);

    window.document.title = new TitleFactory(noteId).getTitle();

    App.header.show(new NotesHeaderModule.NotesHeaderView());
    App.body.show(new NotesModule.NotesView({ noteId: noteId }));
};
