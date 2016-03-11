/* eslint-disable no-undef */

exports.render = function(id, options) {
  var widgetLoc = document.getElementById(id);

  function coordinatesToString(coord) {
    return coord.lat + ',' + coord.long;
  }

  var mode = (options.mode === 'walking')
    ? google.maps.DirectionsTravelMode.WALKING
    : google.maps.DirectionsTravelMode.DRIVING;
  var units = (options.commuteUnits === 'metric')
    ? google.maps.UnitSystem.METRIC
    : google.maps.UnitSystem.IMPERIAL;

  function getCommute() {
    var directionsService = new google.maps.DirectionsService();

    var directionsRequest = {
      origin: coordinatesToString(options.origin),
      destination: coordinatesToString(options.destination),
      travelMode: mode,
      unitSystem: units
    };

    directionsService.route(directionsRequest, function(res, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        widgetLoc.innerHTML = '<p class="commute">'
          + 'Your commute<br />'
          + '<img class="commute-icon" src="img/commute_icons/c_' + options.mode + '.svg" />'
          + res.routes[0].legs[0].distance.text + '<br />'
          + '<img class="commute-icon" src="img/commute_icons/c_duration.svg" />'
          + res.routes[0].legs[0].duration.text + '</p>';
      } else {
        widgetLoc.innerHTML = '<p class="warning">Error getting commute</p>';
      }
    });
  }

  // update commute every 5 minutes
  getCommute();
  return setInterval(getCommute, 5 * 60 * 1000);
};
