module.exports = exports = function(id, options) {
  var widgetLoc = document.getElementById(id);
  options = options || {
    origins: '47.61665,-122.34291',
    destinations: '47.61825,-122.35079',
    mode: 'walking',
    units: 'metric'
  };

  var mode = (options.mode === 'walking') ? google.maps.DirectionsTravelMode.WALKING : google.maps.DirectionsTravelMode.DRIVING;
  var units = (options.mode === 'metric') ? google.maps.UnitSystem.METRIC : google.maps.UnitSystem.IMPERIAL;

  function getCommute() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
      origin: options.origins,
      destination: options.destinations,
      travelMode: mode,
      unitSystem: units
    };

    directionsService.route(directionsRequest, function(res, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        widgetLoc.innerHTML = res.routes[0].legs[0].distance.text + '<br/>' + res.routes[0].legs[0].duration.text;
      } else
        widgetLoc.innerHTML = 'Error getting commute';
    });
  }

  $(document).ready(function() {
    getCommute();
    setInterval(getCommute, 100000);
  });
};
