var apply = (function() {}).apply;
var slice = apply.call.bind([].slice);

function create(isCallback, func, delay) {
  var isTriggered = false;
  var isTimeout = arguments.length > 2;

  var error, args = [];
  var push = apply.bind(args.push, args);
  var deferred = function() {
    isTriggered = false;
    func.apply(this, args);
  };

  return function() {
    if (!isTriggered) {
      args.length = 0; // first call, discard saved arguments
      isTriggered = true; // prevents further calls
      (isTimeout ? setTimeout : process.nextTick)(deferred.bind(this), delay);
    }

    if (isCallback) { // first argument is error, rest is data
      error = arguments[0];
      if (error && !args[0]) {
        args[0] = error;
      }
      push(slice(arguments, 1));
    } else {
      push(arguments);
    }
  };
}

exports.create = create.bind(null, false);
exports.createCallback = create.bind(null, true);
