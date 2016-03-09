const randomGreeting = require(__dirname + '/../lib/random_greeting');
const moment = require('moment');

// getting the time of day
var getGreetingTime = exports.getGreetingTime = function() {
  var splitAM = 12;
  var splitPM = 17;
  var currentHour = parseFloat(moment().format('H'));
  if (currentHour < splitAM) return 'morning';
  if (currentHour > splitPM) return 'evening';
  return 'afternoon';
};

var getTimebasedGreeting = exports.getTimebasedGreeting = function(firstName) {
  var greetStr = 'Good ' + getGreetingTime();
  if (firstName) {
    greetStr += ', ' + firstName;
  }
  return greetStr;
};

exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);
  options = options || {
    greetingStyle: 'randomTicker'
  };

  // updating the DOM
  function updateGreeting(greetStr) {
    widgetLoc.innerHTML = '<p class="greeting">' + greetStr + '</p>';
  }

  switch (options.greetingStyle) {
  // greeting based on time of day
  case 'timebased':
    return updateGreeting(getTimebasedGreeting(userFile.name.first));

  // random greeting from library
  case 'random':
    return updateGreeting(randomGreeting());

  // random greeting, updating every minute
  case 'randomTicker':
    updateGreeting(randomGreeting());
    return setInterval(function() {
      updateGreeting(randomGreeting());
    }, 1000);

  default:
    console.log('invalid greeting style');
  }
};
