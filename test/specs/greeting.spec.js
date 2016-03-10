const expect = require('chai').expect;
const greeting = require(__dirname + '/../../app/js/widgets/greeting');

describe('Greeting helper', () => {
  it('should generate a random greeting', () => {
    expect(greeting.getRandom()).to.be.a('string');
  });

  it('should get time of day', () => {
    expect(greeting.timeOfDay()).to.be.oneOf(['morning', 'afternoon', 'evening']);
  });

  it('should generate a time-based greeting', () => {
    var testGreet = greeting.getTimebased('John');
    expect(testGreet).to.contain('Good ');
    expect(testGreet).to.contain(', John');

    var testGreet2 = greeting.getTimebased();
    expect(testGreet2).to.not.contain(', ');
  });
});
