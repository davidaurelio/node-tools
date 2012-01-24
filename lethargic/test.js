var lethargic = require('./main');
var assert = require('assert');

var DEFAULT_TIMEOUT = 10;
(function() {
  var i = 0;
  var f = lethargic.create(function() {
    i += 1;
    assert.equal(i, 1, 'A wrapped function should be called only once on next tick');
  });

  f(); f(); f();
})();

(function() {
  var i = 0;
  var f = lethargic.create(function() {
    i += 1;
    assert.equal(i, 1, 'A wrapped function should be called only once after a timeout');
  }, DEFAULT_TIMEOUT);

  f(); f(); f();
})();

(function() {
  var o = {};
  var f = lethargic.create(function() {
    assert.equal(this, o, 'A wrapped function should be called in the context of the first call to the wrapper on next tick');
  });

  f.call(o);
})();

(function() {
  var o = {};
  var f = lethargic.create(function() {
    assert.equal(this, o, 'A wrapped function should be called in the context of the first call to the wrapper after a timeout');
  }, DEFAULT_TIMEOUT);

  f.call(o);
})();

(function() {
  var f = lethargic.create(function(a, b, c, d, e, f, g, h, i) {
    var message = 'A wrapped function received the cumulated arguments of all calls';
    assert.equal(arguments.length, 9, message);
    assert.equal(a, 1, message);
    assert.equal(b, 2, message);
    assert.equal(c, 3, message);
    assert.equal(d, 4, message);
    assert.equal(e, 5, message);
    assert.equal(f, 6, message);
    assert.equal(g, 7, message);
    assert.equal(h, 8, message);
    assert.equal(i, 9, message);
  });

  f(1, 2, 3); f(4, 5, 6); f(7, 8, 9);
})();
