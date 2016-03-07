/* eslint-disable no-undef */
const io = require('socket.io-client');
var socket = io.connect('http://localhost:8080');

socket.on('UPDATED_CONFIG', function(configData) {
	console.log(configData);
});



// building widgets
const time = require(__dirname + '/widgets/time_and_date');

time('module-0');
time('module-1');
