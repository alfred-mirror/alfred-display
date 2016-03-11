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
