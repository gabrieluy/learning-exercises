'use strict';

var IndexModule = require('../modules/index/module');
var IndexHeaderModule = require('../modules/header/index/module');

module.exports = function () {
    var App = window.NotesTestApp;

    IndexModule = App.module('IndexModule', IndexModule);
    IndexHeaderModule = App.module('IndexHeaderModule', IndexHeaderModule);

    window.document.title = 'Notes: Home';

    App.header.show(new IndexHeaderModule.IndexHeaderView());
    App.body.show(new IndexModule.IndexView());
};
