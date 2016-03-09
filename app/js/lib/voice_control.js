/* eslint-disable no-undef, no-inner-declarations */
const loadWidgets = require(__dirname + '/../widgets/load_widgets');

module.exports = exports = function(userFile) {
  if (annyang) {
    function renderToMain(content) {
      $('#module-4').html('<span class="voice-result">' + content + '</span>');
    }

    function getFirstName() {
      try {
        return userFile.name.first;
      } catch(e) {
        return null;
      }
    }

    var commands = {
      'hello (there)': function() {
        renderToMain('Hello there.');
      },

      'go home': function() {
        loadWidgets();
        $('.widget').show();
      },

      '(go to) sleep': function() {
        $('.widget').hide();
      },

      'wake up': function() {
        loadWidgets();
        $('.widget').show();
      },

      'spell *word': function(word) {
        renderToMain(word);
      },

      'good :time alfred': function(time) {
        var str = 'Good ' + time;
        var firstName = getFirstName();
        if (firstName) str += ', ' + firstName;
        renderToMain(str);
      },

      'throw a dice': function() {
        var result = Math.floor(Math.random() * 6) + 1;
        renderToMain(result);
      },

      'flip a coin': function() {
        var result = Math.floor(Math.random() * 2);
        renderToMain((result) ? 'Heads' : 'Tails');
      },

      '(magic) mirror on the wall': function() {
        // replace with creepy mirror ghost image
        renderToMain('Who\'s the fairest one of all?');
      },

      'salmons': function() {
        renderToMain('disco');
      }
    };

    annyang.addCommands(commands);

    annyang.addCallback('start', function() {
      console.log('Speech Recognition engine started');
    });

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
      console.log(userSaid);
      console.log(commandText);
      console.log(phrases);
    });

    annyang.start();
  }
};
