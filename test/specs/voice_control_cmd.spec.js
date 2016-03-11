const expect = require('chai').expect;
const commands = require(__dirname + '/../../app/js/lib/voice_control_cmd')(null, []);

describe('Voice command responses', () => {
  beforeEach(() => {
    this.widget = document.createElement('section');
    this.widget.id = 'module-4';
    document.body.appendChild(this.widget);
  });

  afterEach(() => {
    document.body.removeChild(this.widget);
  });

  it('should respond to "hello"', () => {
    commands['hello (there)']();
    var renderedWidget = document.getElementById('module-4');
    expect(renderedWidget.innerHTML).to.contain('<span class="voice-result');
    expect(renderedWidget.innerHTML).to.contain('Hello there.');
  });

  it('should respond to "spell *word"', () => {
    commands['(how do you) spell *word']('elephant');
    var renderedWidget = document.getElementById('module-4');
    expect(renderedWidget.innerHTML).to.contain('<span class="voice-result');
    expect(renderedWidget.innerHTML).to.contain('E-L-E-P-H-A-N-T');
  });

  it('should respond to "good morning alfred"', () => {
    commands['good :time alfred']('morning');
    var renderedWidget = document.getElementById('module-4');
    expect(renderedWidget.innerHTML).to.contain('<span class="voice-result');
    expect(renderedWidget.innerHTML).to.contain('Good morning');
  });

  it('should respond to "throw a dice"', () => {
    commands['throw a dice']();
    var renderedWidget = document.getElementById('module-4');
    expect(renderedWidget.innerHTML).to.contain('<span class="voice-result');
    var diceResult = parseInt(renderedWidget.innerText);
    expect(diceResult).to.be.within(1, 6);
  });

  it('should respond to "flip a coin"', () => {
    commands['flip a coin']();
    var renderedWidget = document.getElementById('module-4');
    expect(renderedWidget.innerHTML).to.contain('<span class="voice-result');
    expect(renderedWidget.innerText).to.be.oneOf(['Heads', 'Tails']);
  });
});
