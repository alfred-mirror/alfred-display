module.exports = exports = function(id, options, user) {
  const randomGreeting = require(__dirname + '/lib/random_greeting');

  var widgetLoc = document.getElementById(id);
  options = options || {
    greetingStyle: 'randomTicker'
  };

  // Helper: updating the DOM
  function updateGreeting(greetStr) {
    widgetLoc.innerHTML = '<p class="greeting">' + greetStr + '</p>';
  }

  // Helper: getting the time of day
  function getGreetingTime() {
    var splitAM = 12;
    var splitPM = 17;
    var currentHour = parseFloat(require('moment')().format('H'));
    if (currentHour < splitAM) return 'morning';
    if (currentHour > splitPM) return 'evening';
    return 'afternoon';
  }

  switch (options.greetingStyle) {
  // greeting based on time of day
  case 'timebased':
    var firstName = (user) ? user.name.first : 'Felicia';
    return updateGreeting('Good ' + getGreetingTime() + ', ' + firstName);

  // random greeting from library
  case 'random':
    return updateGreeting(randomGreeting());

  // random greeting, updating every minute
  case 'randomTicker':
    updateGreeting(randomGreeting());
    return setInterval(function() {
      updateGreeting(randomGreeting());
    }, 60000);

  default:
    console.log('invalid greeting style');
  }
};
