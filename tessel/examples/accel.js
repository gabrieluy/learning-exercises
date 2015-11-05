var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

accel.on('ready', function () {
    accel.on('data', function (position) {
        var x = position[0];
        var y = position[1];
        var z = position[2];

        console.log('   x:', x.toFixed(2),
                    '   y:', y.toFixed(2),
                    '   z:', z.toFixed(2));
    });

});

accel.on('error', function(err){
    console.log('Error:', err);
});
