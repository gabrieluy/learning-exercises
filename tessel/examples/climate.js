var tessel = require('tessel');
var climate = require('climate-si7020').use(tessel.port['B']);

climate.on('ready', function(){
    setInterval(function(){
        climate.readHumidity(function(err, humid){
            climate.readTemperature('c', function(err, temp){
                console.log('Temperatura: %sºC, Humidade: %s%', temp.toFixed(2), humid.toFixed(2));
            });
        });
    }, 1000);
});

climate.on('error', function(err) {
    console.log('error connecting module', err);
});
