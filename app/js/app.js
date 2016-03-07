var socket = io.connect('http://localhost:8080');
console.log(typeof socket);


// building widgets
var time = require(__dirname + '/widgets/time_and_date');

time('module-0');
time('module-1');
