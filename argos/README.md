Argos: a recursive directory watcher
====================================

Argos is a simple recursive directory watcher.


Example:
--------

~~~js
var watchDir = require('argos').watchDir;

watchDir('.', function(error, currentEntries, addedEntries, removedEntries) {
  if (error) {
    throw error;
  }

  // do something with current, added, or removed entries
});
~~~


TODO:
-----

 1. Add tests.
