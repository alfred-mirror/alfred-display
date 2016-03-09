exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);
  options = options || {
    newsContent: 'topStories',
    top: 5
  };
  var apiKey = userFile.news_token;

  //news content - **note needs specific api keys from nyt for different sections
  var baseURI;
  switch (options.newsContent) {
  case 'mostPopular':
    baseURI = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=';
    break;

  case 'topStories':
    baseURI = 'http://api.nytimes.com/svc/topstories/v1/home.json?api-key=';
    break;

  default:
    console.log('invalid news content');
  }

  // ajax call to NYT api - combines base URI with API_KEY
  function getNews() {
    $.ajax({
      url: baseURI + apiKey,
      success: function(res){
        numOfHeadlines(res);
      }
    });
  }

  // runs the number of headlines the user would like to see
  function numOfHeadlines(res) {
    var string = '';
    for(var i = 0; i < options.top; i++) {
      string += res.results[i].title + '<br/>';
    }
    widgetLoc.innerHTML = string;
  }

  getNews();
  setInterval(getNews, 100000);
};
