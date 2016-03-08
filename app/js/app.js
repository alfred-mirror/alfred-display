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
const news = require(__dirname + '/widgets/news');
const commute = require(__dirname + '/widgets/commute');
const weather = require(__dirname + '/widgets/weather');

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
    case 'news':
      news('module-' + index, element.options);
      break;
    case 'commute':
      commute('module-' + index, element.options);
      break;
    case 'weather':
      weather('module-' + index, element.options);
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
    {
      type: 'news',
      options: { key: 'API_KEY', newsContent: 'topStories', top: 5 }
    },
    {
      type: 'weather',
      options: { lat: '47.61665', long: '-122.35079', key: 'API_KEY', units: 'imperial' }
    },
    {
      type: 'greeting',
      options: { greetingStyle: 'timebased' }
    }
  ]
});
