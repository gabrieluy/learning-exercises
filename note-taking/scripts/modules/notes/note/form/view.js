'use strict';

var Marionette = require('backbone.marionette');
var template = require('./template.html');
var NoteCollection = require('../../list/collection');
var NoteModel = require('../model');

module.exports = Marionette.ItemView.extend({
    collection: NoteCollection,

    model: undefined,

    template: template,

    ui: {
        title: '.title',
        description: '.description',
        submit: 'input[type=submit]'
    },

    events: {
        submit: 'onSubmit'
    },

    modelEvents: {
        invalid: 'invalidNote'
    },

    collectionEvents: {
        add: 'noteAdded'
    },

    onShow: function() {
        this.focusForm();
    },

    onSubmit: function (e) {
        e.preventDefault();

        this.createNoteFromForm();
    },

    invalidNote: function () {
        window.alert(this.model.validationError);
    },

    noteAdded: function () {
        this.clearForm();
        this.focusForm();
    },

    createNoteFromForm: function () {
        this.model = new NoteModel({
            id: NoteModel.generateUniqueId(),
            title: this.ui.title.val(),
            description: this.ui.description.val()
        });

        Marionette.bindEntityEvents(this, this.model, this.modelEvents);

        if (this.model.isValid()) {
            this.collection.add(this.model);
            this.collection.sync('update', this.collection);
        }
    },

    clearForm: function () {
        this.ui.title.val('');
        this.ui.description.val('');
    },

    focusForm: function () {
        this.ui.title.focus();
    }
});
