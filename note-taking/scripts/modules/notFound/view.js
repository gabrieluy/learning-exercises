'use strict';

var Marionette = require('backbone.marionette');
var template = require('./template.html');

module.exports = Marionette.ItemView.extend({
    template: template
});
