const time = require(__dirname + '/time_and_date');
const greeting = require(__dirname + '/greeting');
const news = require(__dirname + '/news');
const commute = require(__dirname + '/commute');
const weather = require(__dirname + '/weather');
var storedUserFile;

// load widget(s) on page, depending on the first argument of function call
module.exports = exports = function() {
  var modules;

  if (typeof arguments[0] === 'number') {
    // render specific position only
    modules = storedUserFile.config.modules;
    return renderSingleWidget(modules[arguments[0]], arguments[0]);
  }

  // store user file if one is being passed in
  if (typeof arguments[0] === 'object') storedUserFile = arguments[0];

  // render all widgets from storage
  modules = storedUserFile.config.modules;
  return modules.map((element, index) => renderSingleWidget(element, index));
};

function renderSingleWidget(element, index) {
  switch (element.type) {
  case 'time':
    return time.render('module-' + index, element.options);

  case 'greeting':
    return greeting.render('module-' + index, element.options, storedUserFile);

  case 'news':
    return news.render('module-' + index, element.options, storedUserFile);

  case 'commute':
    commute.render('module-' + index, element.options);
    break;
  case 'weather':
    return weather.render('module-' + index, element.options, storedUserFile);

  default:
    console.log('invalid module type at position ' + index);
  }
}
