'use strict';

// var $ = require('jquery');
var Marionette = require('backbone.marionette');

var indexRouteController = require('./indexRouteController');
var notesRouteController = require('./notesRouteController');
var notFoundController = require('./notFoundController');

module.exports = function () {
    var routerController = {
        index: indexRouteController,
        notes: notesRouteController,
        notFound: notFoundController
    };

    var mainRouter = new Marionette.AppRouter({
        controller: routerController,

        appRoutes: {
            '': 'index',
            'notes': 'notes',
            'notes/:id': 'notes',
            '*notFound': 'notFound'
        }
    });

    mainRouter.listenTo(window.NotesTestApp.vent, 'navigate', mainRouter.navigate);

    // FIXME (future)
    // The following block makes the app not being reloaded when click the index link
    // But due a bug on PhantomJS + LocalStorage, it makes the tests break.
    // See https://twitter.com/phantomjs/status/336841757612449792
    // Because of this, the list will always be reseted (re-init'ed) when navigating back to index.
    // If using in-memory only or regular network (rest) calls, this wouldn't be a problem...
    /*
    $('body').delegate('a', 'click', function (e) {
        var href = $(e.currentTarget).attr('href');

        if (href && href === '/' && !e.isDefaultPrevented()) {
            e.preventDefault();
            mainRouter.navigate(href, { trigger: true });
        }
    });
    */
};
