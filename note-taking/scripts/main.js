'use strict';

var Backbone = require('backbone');
var $ = require('jquery');

var Marionette = require('backbone.marionette');
Marionette.$ = $;
Backbone.$ = $;

//
// Application bootstrap
//
var NotesTestApp = window.NotesTestApp = new Marionette.Application();

NotesTestApp.on('start', function () {
    Backbone.history.start();
});

//
// Main Regions
//
NotesTestApp.addRegions({
    header: '#header',
    body: '#body'
});

//
// Application Routes
//
$(function() {
    // Marionette.$ = Backbone.$ = $;
    var NotesTestAppRouter = require('./router');

    new NotesTestAppRouter();

    NotesTestApp.start();
});
