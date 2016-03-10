const moment = require('moment');

exports.render = function(id, options, userFile) {
  var widgetLoc = document.getElementById(id);

  // NOTE: OPTIONS FORMAT FOR REFERENCE
  // options = {
  //   newsContent: 'topStories',
  //   top: 5
  // };

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
    console.log('invalid news content type');
  }

  // ajax call to NYT api - combines base URI with API_KEY
  function getNews() {
    $.ajax({
      url: baseURI + apiKey,
      success: function(res){
        numOfHeadlines(res);
        console.log(res.results);
      }
    });
  }

  // runs the number of headlines the user would like to see
  function numOfHeadlines(res) {
    var newsHTML = '';
    for(var i = 0; i < options.top; i++) {
      newsHTML += formatRender(res.results[i]);
      // newsHTML += res.results[i].title + '<br/>';
    }
    widgetLoc.innerHTML = newsHTML;
  }

  function formatRender(story) {
    return '<article class="news-story">'
      + '<p class="news-headline">' + story.title + '</p>'
      + '<p class="news-info">'
        + story.section + ' / ' + story.subsection + ' &bull; '
        + moment(story.created_date).fromNow()
      +'</p></article>';
  }

  $.ajax(baseURI + apiKey)
    .then(function(res) {
      // connection is valid
      // update news every hour
      getNews();
      return setInterval(getNews, 60 * 60 * 1000);
    }, function(err) {
      // connection failed
      console.log(err);
      widgetLoc.innerHTML = '<p class="warning">There was an error fetching your news feed. Please make sure you have entered a valid token.</p>';
    });
};
