/* eslint-disable no-undef, no-inner-declarations */

module.exports = exports = function(userFile, intervalsOnPage) {
  console.log(intervalsOnPage);
  if (annyang) {
    const commands = require(__dirname + '/voice_control_cmd')(userFile, intervalsOnPage);

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
