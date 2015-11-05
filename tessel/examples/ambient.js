var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['C']);

ambient.on('ready', function () {
    setInterval(function () {
        ambient.getLightLevel(function(err, lightData) {
            ambient.getSoundLevel(function(err, soundData) {
                console.log('Nível de luz: %s    Nível de som: %s', lightData.toFixed(8), soundData.toFixed(8));
            });
        })}, 500);

        // Gatilho de luz:
        ambient.setLightTrigger(0.5);

        ambient.on('light-trigger', function(data) {
            console.log('Gatilho de luz disparado:', data);

            ambient.clearLightTrigger();
            setTimeout(function () {
                ambient.setLightTrigger(0.5);
            }, 1500);
        });

        // Gatilho de som:
        ambient.setSoundTrigger(0.1);

        ambient.on('sound-trigger', function(data) {
            console.log('Gatilho de som disparado:', data);

            ambient.clearSoundTrigger();

            setTimeout(function () {
                ambient.setSoundTrigger(0.1);
            }, 1500);
        });
});

ambient.on('error', function (err) {
    console.log(err)
});
