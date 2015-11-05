'use strict';

var NotFoundModule = require('../modules/notFound/module');
var NotFoundHeaderModule = require('../modules/header/notFound/module');

module.exports = function () {
    var App = window.NotesTestApp;

    NotFoundModule = App.module('NotFoundModule', NotFoundModule);
    NotFoundHeaderModule = App.module('NotFoundHeaderModule', NotFoundHeaderModule);

    window.document.title = 'Notes: 404';

    App.header.show(new NotFoundHeaderModule.NotFoundHeaderView());
    App.body.show(new NotFoundModule.NotFoundView());
};
