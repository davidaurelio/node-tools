Tools for node.js
=================

lethargic
---------

Creates a function that will be executed on next tick or after a timeout.
Repeated calls until execution won’t trigger more calls, the callback is only
executed once.

Examples:

    ~~~js
    var lethargic = require('lethargic').create;

    var emitSweets = lethargic(parent.emit.bind(parent, 'sweets'), 20000);

    child.on('wantsweets', emitSweets);
    child.emit('sweets');
    child.emit('sweets');
    child.emit('sweets'); // sweets are emitted once after twenty seconds
    ~~~
