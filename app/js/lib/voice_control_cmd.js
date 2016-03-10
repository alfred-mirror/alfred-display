module.exports = exports = function(userFile, intervalsOnPage) {
  const loadWidgets = require(__dirname + '/../widgets/load_widgets');
  var currentInterval;

  function renderToMain(content, size) {
    size = size || 2;
    $('#module-4').html('<span class="voice-result-' + size + '">' + content + '</span>');
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
      renderToMain('Hello there.', 3);
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
      renderToMain(str, 3);
    },

    'throw a dice': function() {
      clearMainInterval();
      var result = Math.floor(Math.random() * 6) + 1;
      renderToMain(result, 3);
    },

    'flip a coin': function() {
      clearMainInterval();
      var result = Math.floor(Math.random() * 2);
      renderToMain((result) ? 'Heads' : 'Tails', 3);
    },

    '(magic) mirror on the wall': function() {
      clearMainInterval();
      $('#module-4').hide().html('<img class="mirror-ghost" src="img/mirror_ghost.png" />').fadeIn(5000);
    },

    'tests': function() {
      clearMainInterval();
      renderToMain('NO', 4);
    }
  };

  return commands;
};
