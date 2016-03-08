module.exports = exports = function(id, options) {
  // var id = id;
  var widgetLoc = document.getElementById(id);
  options = options || {
    // default to seattle
    lat: '47.61665',
    long: '-122.35079',
    // needs a real key
    key: 'API_KEY',
    units: 'imperial'
  };

  // puts all options into a query string
  var locUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' 
    + options.lat + '&lon=' + options.long + '&units=' + options.units + '&appid=' + options.key;

  // ajax call to google maps api
  function getWeather() {
    $.ajax({
      url: locUrl,
      type: 'GET',
      dataType: 'json',
      crossDomain: true,
      success: function(res){
        var hiTemp = res.main.temp_max;
        var loTemp = res.main.temp_min;
        var city = res.name;
        var weatherDesc = res.weather[0].description;
        var imgLoc = res.weather[0].icon;

        var weatherMsg = '<article>'
                          + '<h3>Today\'s Weather in ' + city + '</h3>'
                          + '<p>' + 'High Temperature: ' + hiTemp + '</p>'
                          + '<p>' + 'Low Temperature: ' + loTemp +'</p>'
                          + '<p>' + weatherDesc + '</p>'
                          + '<img src=\"http://openweathermap.org/img/w/' + imgLoc + '.png\"></img>'
                          + '</article>';
        widgetLoc.innerHTML = weatherMsg;
      }
    });
  }

  getWeather();
  setInterval(getWeather, 10000000);
};
