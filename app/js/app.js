/* eslint-disable no-undef */

const io = require('socket.io-client');
var socket;

const loadWidgets = require(__dirname + '/widgets/load_widgets');
const initVoiceControl = require(__dirname + '/lib/voice_control');

// get owner id for socket connection
$('#authForm').submit(function(e) {
  e.preventDefault();
  var authString = $(e.target).children('input[name=auth]').val();
  socket = io.connect('http://localhost:8080');
  socket.emit('JOIN_ROOM', authString);
  $(e.target).hide();

  socket.on('UPDATED_CONFIG', function(userFile) {
    // build modules with config data
    loadWidgets(userFile);
    console.log(userFile);
    initVoiceControl(userFile);
  });
});

// fake data for rendering test only:
var fakeUserFile = {
  name: { first: 'John', last: 'Doe' },
  twitter_token: 'String',
  weather_token: 'ac63c928ee86e580e68b306e9ddf62fb',
  news_token: '9159dc7a40755189f3356208d9fd6691:14:61615709',

  config: {
    name: 'My config',
    color: { main: '#ffffff', accent: '#2196F3' },
    modules: [
      {
        type: 'commute',
        options: {
          origin: { lat: 47.61665, long: -122.34291 },
          destination: { lat: 47.61825, long: -122.35079 },
          mode: 'walking',
          units: 'metric'
        }
      },
      {
        type: 'time',
        options: { twentyFour: true, dayLong: true, monthLong: true }
      },
      {
        type: 'news',
        options: { newsContent: 'topStories', top: 5 }
      },
      {
        type: 'weather',
        options: {
          location: { lat: 47.61665, long: -122.35079 },
          units: 'imperial'
        }
      },
      {
        type: 'greeting',
        options: { greetingStyle: 'randomTicker' }
      }
    ]
  }
};

var intervalsOnPage = loadWidgets(fakeUserFile);
initVoiceControl(fakeUserFile, intervalsOnPage);
