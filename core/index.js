Object.defineProperty(global, '__stack', {
get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__dbg', {
    get: function() {
        var msg =  __stack[1].getFileName().replace('/Users/dev/Ghost/','/') + '::' + __stack[1].getFunctionName() + '()';
        console.log(msg);
        return msg;
    }
});

Object.defineProperty(global, '__dbga', {
    get: function() {
        return function(rsvargs) {
            var msg =  __stack[1].getFileName().replace('/Users/dev/Ghost/','/') + '::' + __stack[1].getFunctionName();
            if(arguments.length > 0)
            {
                msg +=  '(' + JSON.stringify(rsvargs) + ')';
            }
            else
            {
                msg +=  '()';
            }

            console.log(msg);
            return msg;
        };
    }
});

// ## Server Loader
// Passes options through the boot process to get a server instance back
var server = require('./server');

// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function makeGhost(options) {
    options = options || {};

    return server(options);
}

module.exports = makeGhost;
