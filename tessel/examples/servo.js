var tessel = require('tessel');
var servo = require('servo-pca9685').use(tessel.port['D']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {
    var position = 0;  // Posição do servo entre 0 (min) e 1 (max).

    servo.configure(servo1, 0.05, 0.12, function () {
        setInterval(function () {
            console.log('Posição (entre 0-1):', position);

            servo.move(servo1, position);

            // Incrementa posição em 10%
            position += 0.1;
            if (position > 1) {
                position = 0; // Reseta a posição do servo
            }
        }, 500);
    });
});
