var phrases = [
  'Hello, sexy!',
  'You can\'t fix ugly...',
  'Greetings, stranger.',
  'I guess you\'re okay.',
  'G\'day, mate!',
  'How\'s it going?',
  'Selamat pagi!',
  'YO!',
  'YOLO!',
  'Top of the morning to ya!',
  'Hola!'
];

module.exports = exports = function() {
  return phrases[Math.floor(Math.random() * phrases.length)];
};
