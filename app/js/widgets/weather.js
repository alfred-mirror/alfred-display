exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);

  // NOTE: OPTIONS FORMAT FOR REFERENCE
  // options = {
  //   location: { lat: 47.61665, long: -122.35079 },
  //   units: 'imperial'
  // };

  var apiKey = userFile.weather_token;

  // puts all options into a query string
  var locUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='
  + options.location.lat + '&lon=' + options.location.long + '&units=' + options.units + '&appid=' + apiKey;

  function renderWeather(res) {
    var hiTemp = res.main.temp_max.toFixed(0) + '&#176;';
    var loTemp = res.main.temp_min.toFixed(0) + '&#176;';
    var currTemp = res.main.temp.toFixed(0) + '&#176;';
    var city = res.name;
    var weatherDesc = res.weather[0].description;
    var imgLoc = res.weather[0].icon;

    var weatherHTML = '<article class="weather">'
      + '<p class="weather-title">Weather in ' + city + '</p>'
      + '<div class="weather-body">'
        + '<img class="weather-icon" src=\"img/weather_icons/w_' + imgLoc + '.svg\"></img>'
        + '<p class="weather-curr">' + currTemp + '</p>'
      + '</div>'
      + '<p>High: ' + hiTemp + ' / Low: ' + loTemp + '</p>'
      + '<p>' + weatherDesc + '</p>'
      + '</article>';
    widgetLoc.innerHTML = weatherHTML;
  }

  function updateWeather() {
    // ajax call to open weather map api
    $.ajax({
      url: locUrl,
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      success: renderWeather
    });
  }

  $.ajax({
    url: locUrl,
    type: 'GET',
    dataType: 'json',
    crossDomain: true
  })
    .then(function(res) {
      // valid connection
      // update weather every hour
      renderWeather(res);
      return setInterval(updateWeather, 60 * 60 * 1000);
    }, function(err) {
      // failed connection
      console.log(err);
      widgetLoc.innerHTML = '<p class="warning">There was an error fetching the weather. Please make sure you have entered a valid token.</p>';
    });
};
