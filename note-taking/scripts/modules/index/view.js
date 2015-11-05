'use strict';

var Marionette = require('backbone.marionette');
var NoteListView = require('../notes/list/view.js');
var template = require('./template.html');

module.exports = Marionette.LayoutView.extend({
    template: template,

    notesLimit: 5,

    initialize: function () {
        this.noteListView = new NoteListView({ limit: this.notesLimit });
    },

    regions: {
        notesList: '.notes-list'
    },

    onShow: function () {
        this.notesList.show(this.noteListView);
    },

    render: function () {
        this.$el.html(this.template({ limit: this.notesLimit }));
    }
});
