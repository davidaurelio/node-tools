Tools for node.js
=================

lethargic
---------

Creates a function that will be executed on next tick or after a timeout.
Repeated calls until execution won’t trigger more calls, the function is only
executed once. When invoked, wrapped functions receive the arguments from all
calls.

### API:

  * `lethargic.create(func [, timeout])` creates a wrapped function. If the
    wrapper is called, the function is invoked on next tick or – if `timeout`
    is given – after that time.

    The wrapped function is invoked only once, regardless how often the wrapper
    is called up to that point. When invoked, `this` will reference the the
    context of the first call to the wrapper. The function will receive all
    arguments passed to the wrapper in order.

  * `lethargic.createCallback(func [, timeout])` works similar to `create`, but
    creates a wrapped function that is more suitable as callback. That means,
    that the first argument received will be the first error occured (or
    `null`), with all data arguments following. Check the example.


### Examples:

~~~js
var l = require('lethargic');

var emitSweets = l.create(parent.emit.bind(parent, 'sweets'), 20000);

child.on('wantsweets', emitSweets);
child.emit('wantsweets');
child.emit('wantsweets');
child.emit('wantsweets'); // sweets are emitted once after twenty seconds
~~~

~~~js
var fs = require('fs');
var l = require('lethargic');

// read file async, console.log once per tick

fs.readFile('README.md', 'utf-8', l.createCallback(function(error, data) {
/*
    arguments are collected and concatenated.
    if readFile called the callback three times, arguments would be
    [(firstError or null), data0, data1, data2]
*/

if (error) {
    throw error;
}

var contents = '';
for (var i = 1, len = arguments.length; i < len; i++) {
    contents += arguments[i];
}

console.log(contents);
}));
~~~
