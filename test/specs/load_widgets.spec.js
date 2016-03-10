const expect = require('chai').expect;
const loadWidgets = require(__dirname + '/../../app/js/widgets/load_widgets');

describe('Load widget script', () => {
  var testUserFile = {
    name: { first: 'John' },
    config: {
      modules: []
    }
  };

  beforeEach(() => {
    this.widget = document.createElement('section');
    this.widget.id = 'module-0';
    document.body.appendChild(this.widget);
  });

  afterEach(() => {
    document.body.removeChild(this.widget);
    clearInterval(this.currInterval);
  });

  it('should render a greeting module', () => {
    testUserFile.config.modules[0] = {
      type: 'greeting',
      options: { greetingStyle: 'randomTicker' }
    };

    this.currInterval = loadWidgets(testUserFile)[0];
    var renderedWidget = document.getElementById('module-0');
    expect(renderedWidget.innerHTML).to.contain('<p class="greeting">');
  });

  it('should render a time module', () => {
    testUserFile.config.modules[0] = {
      type: 'time',
      options: { twentyFour: true, dayLong: true, monthLong: true }
    };

    this.currInterval = loadWidgets(testUserFile)[0];
    var renderedWidget = document.getElementById('module-0');
    expect(renderedWidget.innerHTML).to.contain('<span class="time-clock">');
  });

  it('should render a news module', (done) => {
    testUserFile.config.modules[0] = {
      type: 'news',
      options: { newsContent: 'topStories', top: 5 }
    };

    this.currInterval = loadWidgets(testUserFile)[0];
    setTimeout(() => {
      var renderedWidget = document.getElementById('module-0');
      expect(renderedWidget.innerHTML).to.contain('<p class="warning">');
      done();
    }, 500);
  });

  it('should render a commute module', (done) => {
    testUserFile.config.modules[0] = {
      type: 'commute',
      options: {
        origin: { lat: 47.61665, long: -122.34291 },
        destination: { lat: 47.61825, long: -122.35079 },
        mode: 'walking',
        units: 'metric'
      }
    };

    this.currInterval = loadWidgets(testUserFile)[0];
    setTimeout(() => {
      var renderedWidget = document.getElementById('module-0');
      expect(renderedWidget.innerHTML).to.contain('<p class="commute">');
      done();
    }, 500);
  });

  it('should render a weather module', (done) => {
    testUserFile.config.modules[0] = {
      type: 'weather',
      options: {
        location: { lat: 47.61665, long: -122.35079 },
        units: 'metric'
      }
    };

    this.currInterval = loadWidgets(testUserFile)[0];
    setTimeout(() => {
      var renderedWidget = document.getElementById('module-0');
      expect(renderedWidget.innerHTML).to.contain('<p class="warning">');
      done();
    }, 500);
  });
});
