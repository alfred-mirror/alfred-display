exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);

  // NOTE: OPTIONS FORMAT FOR REFERENCE
  // options = {
  //   location: { lat: 47.61665, long: -122.35079 },
  //   units: 'imperial'
  // };

  var apiKey = userFile.weather_token;


  function updateWeather() {
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
        var hiTemp = res.main.temp_max + '&#176;';
        var loTemp = res.main.temp_min  + '&#176;';
        var currTemp = res.main.temp  + '&#176;';
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
    });
  }

  // update weather every hour
  updateWeather();
  return setInterval(updateWeather, 60 * 60 * 1000);
};
