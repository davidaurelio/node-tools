'use strict';

var lethargic = require('./main');
var assert = require('assert');

var TIMEOUT = 10;

function test(create, message, testFunc) {
  [
    ['on next tick', function(f) { return create(f); }],
    ['after a timeout', function(f) { return create(f, TIMEOUT); }]
  ].forEach(function(p) {
    var suffix = p[0];
    testFunc(message + ' ' + p[0], p[1]);
  });
}

var testStandard = test.bind(null, lethargic.create);
var testCallback = test.bind(null, lethargic.createCallback);

testStandard(
  'A wrapped function should be called only once',
  function(message, create) {
    var i = 0;
    var f = create(function() {
      i += 1;
      assert.equal(i, 1, message);
    });

    f(); f(); f();
});

testStandard(
  'A wrapped function should be called in the context of the first call to the wrapper',
  function(message, create) {
    var o = {};
    var f = create(function() {
      assert.equal(this, o, message);
    });

    f.call(o);
  }
);

testStandard(
  'A wrapped function received the cumulated arguments of all calls',
  function(message, create) {
    var f = create(function(a, b, c, d, e, f, g, h, i) {
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
  }
);

testCallback(
  'A wrapped callback should be called only once',
  function(message, create) {
    var i = 0;
    var f = create(function() {
      i += 1;
      assert.equal(i, 1, message);
    });

    f(); f(); f();
});

testCallback(
  'A wrapped callback should be called in the context of the first call to the wrapper',
  function(message, create) {
    var o = {};
    var f = create(function() {
      assert.equal(this, o, message);
    });

    f.call(o);
  }
);

testCallback(
  'A wrapped callback received the cumulated arguments of all calls',
  function(message, create) {
    var f = create(function(error, a, b, c, d, e, f, g, h, i) {
      assert.equal(arguments.length, 10, message);
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

    f(null, 1, 2, 3); f(null, 4, 5, 6); f(null, 7, 8, 9);
  }
);

