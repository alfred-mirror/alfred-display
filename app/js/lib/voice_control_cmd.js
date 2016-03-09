module.exports = exports = function(userFile, intervalsOnPage) {
  const loadWidgets = require(__dirname + '/../widgets/load_widgets');
  var currentInterval;

  function renderToMain(content) {
    $('#module-4').html('<span class="voice-result">' + content + '</span>');
  }

  function clearMainInterval() {
    clearInterval(intervalsOnPage[4]);
  }

  function clearCurrentInterval() {
    clearInterval(currentInterval);
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

    '(go to) sleep': function() {
      $('.widget').hide();
    },

    'wake up': function() {
      loadWidgets();
      $('.widget').show();
    },

    '(how do you) spell *word': function(word) {
      clearMainInterval();
      renderToMain(word.toUpperCase().split(' ').map((el) => el.split('').join('-')).join(' '));
    },

    'go home': function() {
      clearCurrentInterval();
      intervalsOnPage[4] = loadWidgets(4);
      $('.widget').show();
    },

    'good :time alfred': function(time) {
      clearMainInterval();
      var str = 'Good ' + time;
      var firstName = getFirstName();
      if (firstName) str += ', ' + firstName;
      renderToMain(str);
    },

    'throw a dice': function() {
      clearMainInterval();
      var result = Math.floor(Math.random() * 6) + 1;
      renderToMain(result);
    },

    'flip a coin': function() {
      clearMainInterval();
      var result = Math.floor(Math.random() * 2);
      renderToMain((result) ? 'Heads' : 'Tails');
    },

    '(magic) mirror on the wall': function() {
      clearMainInterval();
      // replace with creepy mirror ghost image
      renderToMain('Who\'s the fairest one of all?');
    },

    'salmons': function() {
      clearMainInterval();
      renderToMain('disco');
    }
  };

  return commands;
};
