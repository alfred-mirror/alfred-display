var getWeather = exports.getWeather = function(options, apiKey) {
  // puts all options into a query string
  var locUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='
    + options.location.lat + '&lon=' + options.location.long + '&units=' + options.units + '&appid=' + apiKey;

  // ajax call to open weather map api
  $.ajax({
    url: locUrl,
    type: 'GET',
    dataType: 'json',
    crossDomain: true,
    success: function(res) {
      var hiTemp = res.main.temp_max;
      var loTemp = res.main.temp_min;
      var city = res.name;
      var weatherDesc = res.weather[0].description;
      var imgLoc = res.weather[0].icon;

      return '<article>'
              + '<h3>Today\'s Weather in ' + city + '</h3>'
              + '<p>' + 'High Temperature: ' + hiTemp + '</p>'
              + '<p>' + 'Low Temperature: ' + loTemp +'</p>'
              + '<p>' + weatherDesc + '</p>'
              + '<img src=\"http://openweathermap.org/img/w/' + imgLoc + '.png\"></img>'
              + '</article>';
    }
  });
};

exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);
  options = options || {
    location: { lat: '47.61665', long: '-122.35079' },
    units: 'imperial'
  };

  var apiKey = userFile.weather_token;

  function updateWeather() {
    widgetLoc.innerHTML = getWeather(options, apiKey);
  }

  // update weather every hour
  updateWeather();
  return setInterval(updateWeather, 60 * 60 * 1000);
};
