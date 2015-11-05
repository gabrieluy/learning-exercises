require.config({
  baseUrl: '../js/',
  urlArgs: 'cb=' + Math.random(),
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    json2: 'libs/json/json2',
    jasmine: 'libs/jasmine/jasmine',
    'jasmine-html': 'libs/jasmine/jasmine-html',
    spec: '../spec/'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    app: [
      'backbone',
      'json2'
    ]
  }
});

require(['underscore', 'jquery', 'jasmine-html', 'app'], function(_, $, jasmine, app) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [
    '../spec/SpecHelper',
    '../spec/WeaponSpec',
    '../spec/GameEngineSpec',
    '../spec/TraditionalGameSpec',
    '../spec/LizardSpockGameSpec',
    '../spec/PlayerSpec',
    '../spec/GameControllerSpec'
  ];


  $(function() {
    require(specs, function() {
      jasmineEnv.execute();
    });
  });
});

