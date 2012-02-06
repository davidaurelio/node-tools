'use strict';

var fs = require('fs');
var joinPath = require('path').join;

exports.watchDir = watchDir;

/**
 * Checks a list of directory entries for sub directories to watch.
 * @param {string} dir The base directory
 * @param {Array} entries An array of directory entries to watch for changes if
 *    they are directories.
 * @param {Function} callback The callback to invoke on directory changes
 */
function watchSubdirs(dir, entries, callback) {
  entries.forEach(function(entry) {
    entry = joinPath(dir, entry);
    fs.stat(entry, function(stat) {
      if (stat.isDirectory()) {
        watchDir(entry, callback);
      }
    });
  });
}

/**
 * Watches a directory for changes recursively using nodes `fs.watch()`.
 *
 * @param {string} dir The directory to watch for changes.
 * @param {Function} callback The callback to invoke on changes.
 *    Parameters passed to the callback are `callback(error)` or
 *    `callback(null, entries, entriesAdded, entriesRemoved)`
 */
function watchDir(dir, callback) {
  fs.readdir(dir, function(error, entries) {
    if (error) {
      return callback(error);
    }

    watchSubdirs(dir, entries, callback);
    function onerror(error) {
      fswatcher.close();
      fswatcher = null;
      callback(error);
    }

    var fswatcher = fs.watch(dir, function(error) {
      if (error) {
        return onerror(callback);
      }

      fs.readdir(dir, function(error, newEntries) {
        if (error) {
          return onerror(callback);
        }

        var d = sets(entries, newEntries);
        var added = d[1];
        watchSubdirs(dir, added, callback);
        callback(null, d[0], added, d[2]);
      });
    });
  });
}

/**
 * @param {Array} left
 * @param {Array} right
 * @returns {Array}
 */
function sets(left, right) {
  var i, idx, item, len;
  var complementLeft = []; // items only in right or in left and right
  var differenceLeft = []; // items only in left
  var differenceRight = right.slice(); // will contain items only in right
  for (i = 0, len = left.length; i < len; i++) {
    item = left[i];
    idx = right.indexOf(item);
    if (idx === -1) { // only in left
      differenceLeft.push(item);
    }
    else {
      complementLeft.push(item);
      differenceRight.splice(idx, 1);
    }

    complementLeft.push.apply(complementLeft, differenceRight);
  }

  return [complementLeft, differenceRight, differenceLeft];
}
