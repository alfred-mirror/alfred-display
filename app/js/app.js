/* eslint-disable no-undef */

const io = require('socket.io-client');
var socket;

const loadWidgets = require(__dirname + '/widgets/load_widgets');
const initVoiceControl = require(__dirname + '/lib/voice_control');

$('#authForm').submit(function(e) {
  e.preventDefault();
  var authString = $(e.target).children('input[name=auth]').val();
  socket = io.connect('http://localhost:8080');
  socket.emit('JOIN_ROOM', authString);
  $(e.target).hide();

  socket.on('UPDATED_CONFIG', function(userFile) {
    // build modules with config data
    console.log(userFile);
    var intervalsOnPage = loadWidgets(userFile);
    initVoiceControl(userFile, intervalsOnPage);
  });
});

// fake data for rendering test only:
var fakeUserFile = {
  name: { first: 'John', last: 'Doe' },
  twitter_token: 'String',
  weather_token: 'String',
  news_token: 'String',

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
          units: 'imperial'
        }
      },
      {
        type: 'time',
        options: { twentyFour: false, dayLong: false, monthLong: false }
      },
      {
        type: 'news',
        options: {
          newsContent: 'topStories',
          top: 3
        }
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
        options: { greetingStyle: 'timebased' }
      }
    ]
  }
};

var intervalsOnPage = loadWidgets(fakeUserFile);
initVoiceControl(fakeUserFile, intervalsOnPage);
