/* eslint-disable no-undef */

const io = require('socket.io-client');
var socket;

// get owner id for socket connection
$('#authForm').submit(function(e) {
  e.preventDefault();
  var authString = $(e.target).children('input[name=auth]').val();
  socket = io.connect('http://localhost:8080');
  socket.emit('JOIN_ROOM', authString);
  $(e.target).hide();

  socket.on('UPDATED_CONFIG', function(configData) {
    console.log(configData);
    // build modules with config data
    loadWidgets(configData);
  });
});

const time = require(__dirname + '/widgets/time_and_date');
const greeting = require(__dirname + '/widgets/greeting');

// load all widgets on page
function loadWidgets(configData) {
  var modules = configData.modules;
  modules.forEach(function(element, index) {
    switch (element.type) {
    case 'time':
      time('module-' + index, element.options);
      break;
    case 'greeting':
      greeting('module-' + index, element.options, configData.user);
      break;
    default:
      console.log('invalid module type at position ' + index);
    }
  });
}

// fake data for rendering only:
loadWidgets({
  modules: [
    {
      type: 'greeting',
      options: { greetingStyle: 'randomTicker' }
    },
    {
      type: 'time',
      options: { twentyFour: true, dayLong: true, monthLong: true }
    },
    {},
    {},
    {
      type: 'greeting',
      options: { greetingStyle: 'timebased' }
    }
  ]
});
