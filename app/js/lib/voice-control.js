/* eslint-disable no-undef*/

module.exports = exports = function() {
  if (annyang) {
    var commands = {
      'hello (there)': function() {
        $('#module-4').text('Hello there.');
      },
      'go home': function() {

      },
      '(go to) sleep': function() {
        $('.widget').hide();
      },
      'wake up': function() {
        $('.widget').show();
      },
      'spell *word': function(word) {
        $('#module-4').text(word);
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
