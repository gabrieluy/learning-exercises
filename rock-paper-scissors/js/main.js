require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone:  'libs/backbone/backbone',
    text: 'libs/require/text',
    json2: 'libs/json/json2',
    templates: '../templates'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'app': [
      'backbone',
      'json2'
    ]
  }
});

require(['app'], function(app) {
  app.initialize();
}, function(err) {
  throw err;
});

