'use strict';

var test = require('tap').test;
var assert = require('assert');
var sinon = require('sinon');

function FSWatchable() {

}

function walk(watchable, consumer)
test('watchOn watches a watchable', function(t) {
  t.test('watchOn connects to the change event of a watchable', function(t) {
    var watchableMock = {
      watch: sinon.spy()
    };

    watchOn(watchableMock);

    t.assert(watchableMock.on.calledWith('change'));
    t.end();
  });

  t.end();
});


FSDirectoryWatchable(path) {

}
