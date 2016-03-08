module.exports = exports = function(id, options) {
  var widgetLoc = document.getElementById(id);
  options = options || {
    origins: '47.61665,-122.34291',
    destinations: '47.61825,-122.35079',
    mode: 'walking',
    units: 'imperial'
  };

  // puts all options into a query string
  var query = 'https://maps.googleapis.com/maps/api/distancematrix/json?mode=' + options.mode + '&origins=' + options.origins + '&destinations=' + options.destinations + '&key=' + options.key;
  console.log(query);

  // ajax call to google maps api
  function getCommute() {
    $.ajax({
      url: query,
      type: 'GET',
      dataType: 'jsonp',
      crossDomain: true,
      success: function(res){
        console.log('im here');
        widgetLoc.innerHTML(JSON.stringify(res));
        meth(res);
      }
    });
  }

  function meth(res) {
    console.log(res);
  }

  getCommute();
  setInterval(getCommute, 100000);
};
