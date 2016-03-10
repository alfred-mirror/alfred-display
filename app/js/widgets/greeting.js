const getRandom = exports.getRandom = require(__dirname + '/../lib/random_greeting');
const moment = require('moment');

// getting the time of day
var timeOfDay = exports.timeOfDay = function() {
  var splitAM = 12;
  var splitPM = 17;
  var currentHour = parseFloat(moment().format('H'));
  if (currentHour < splitAM) return 'morning';
  if (currentHour > splitPM) return 'evening';
  return 'afternoon';
};

var getTimebased = exports.getTimebased = function(firstName) {
  var greetStr = 'Good ' + timeOfDay();
  if (firstName) {
    greetStr += ', ' + firstName;
  }
  return greetStr;
};

exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);

  // NOTE: OPTIONS FORMAT FOR REFERENCE
  // options = {
  //   greetingStyle: 'randomTicker'
  // };

  // updating the DOM
  function updateGreeting(greetStr) {
    widgetLoc.innerHTML = '<p class="greeting">' + greetStr + '</p>';;
  }

  switch (options.greetingStyle) {
  // greeting based on time of day
  case 'timebased':
    return updateGreeting(getTimebased(userFile.name.first));

  // random greeting from library
  case 'random':
    return updateGreeting(getRandom());

  // random greeting, updating every minute
  case 'randomTicker':
    updateGreeting(getRandom());
    return setInterval(function() {
      updateGreeting(getRandom());
    }, 1000);

  default:
    console.log('invalid greeting style');
  }
};
