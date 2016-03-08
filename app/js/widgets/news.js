module.exports = exports = function(id, options) {
  var widgetLoc = document.getElementById(id);
  options = options || {
    newsContent: 'topStories',
    top: 5
  };

  //news content - **note needs specific api keys from nyt for different sections
  switch (options.newsContent) {
  case 'mostPopular':
    var baseURI = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=';
    break;

  case 'topStories':
    var baseURI = 'http://api.nytimes.com/svc/topstories/v1/home.json?api-key=';
    break;

  default:
    console.log('invalid news content');
  }

  // ajax call to NYT api - combines base URI with API_KEY
  function getNews() {
    $.ajax({
      url: baseURI + options.key,
      success: function(res){
        numOfHeadlines(res);
      }
    });
  }

  // runs the number of headlines the user would like to see
  function numOfHeadlines(res) {
    var string = '';
    for(var i=0; i<options.top; i++) {
      string += res.results[i].title + '<br/>';
    }
    widgetLoc.innerHTML = string;
  }

  getNews();
  setInterval(getNews, 100000);
};
