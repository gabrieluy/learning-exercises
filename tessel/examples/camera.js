var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['D']);

var notificationLED = tessel.led[3];

camera.on('ready', function() {
    notificationLED.high();

    camera.takePicture(function(err, image) {
        if (err) {
            console.log('Erro tirando a foto:', err);
        } else {
            notificationLED.low();
            var timestamp = new Date().toISOString().split('.')[0];
            var name = 'foto-' + timestamp + '.jpg';

            process.sendfile(name, image);

            camera.disable();
        }
    });
});

camera.on('error', function(err) {
    console.error(err);
});
