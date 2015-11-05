var tessel = require('tessel');
var ambientLib = require('ambient-attx4');

var ambient = ambientLib.use(tessel.port['A']);
var INTERVAL = 500;

ambient.on('ready', function() {
    setInterval(function() {
        ambient.getSoundLevel(function(err, data) {
            if (err) { throw err; }

            //TODO remove the logging in the future
            console.log('Sound level:', data.toFixed(8));
        });
    }, INTERVAL);
});

//TODO on trigger, start remote microfone

//TODO after a few seconds of "silence", stop microfone and save recorded audio

ambient.on('error', function(err) {
    console.log('Sound module error:', err);
});
