'use strict';

var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var NoteView = require('./item/view');
var NoteCollection = require('./collection');

module.exports = Marionette.CollectionView.extend({
    tagName: 'ul',

    className: 'js-notes-list',

    childView: NoteView,

    initialize: function (options) {
        var limit = options && options.limit || 0;
        this.collection = this.limitCollection(limit);
    },

    // No really good way of rendering a subset of a collection without the need of plugins,
    // so just slicing the amount of models we want into a new simple collection...
    limitCollection: function (limit) {
        if (limit === 0) {
            return NoteCollection;
        }
        return new Backbone.Collection(NoteCollection.first(limit));
    }
});
