module.exports = exports = function(id, options) {
  var moment = require('moment');

  var widgetLoc = document.getElementById(id);
  options = options || {
    twentyFour: false,
    dayLong: true,
    monthLong: true
  };

  // set up variables as per options
  var dateFormat = ((options.dayLong) ? 'dddd, ' : 'ddd, ')
    + ((options.monthLong) ? 'MMMM' : 'MMM')
    + ' D YYYY';
  var timeFormat = (options.twentyFour) ? ('HH:mm') : ('hh:mm a');

  // update time widget
  function updateWidget() {
    var now = moment();
    widgetLoc.innerHTML = now.format(dateFormat) + '<br />'
    + '<span class="time-clock">' + now.format(timeFormat) + '</span>';
  }

  updateWidget();
  setInterval(updateWidget, 10000);
};
