'use strict';
var conext = require('conext');
var methods = require('methods');

module.exports = exports = function (express) {
    augmentRouter(express.Router);
    augmentRoute(express.Route.prototype);
}

var wrapgf = exports.wrapAllGeneratorFunction = function (args) {
    var results = args.slice();
    args.forEach(function (arg, i) {
        if (typeof arg === 'function') {
            results[i] = conext(arg);
        }
    });
    return results;
}

var _slice = Array.prototype.slice;

var augmentRouter = exports.augmentRouter = augmentProtoMethod('use');
var augmentRoute = exports.augmentRoute = function (Route) {
    methods.concat('all').forEach(function(method){
        augmentProtoMethod(method)(Route);
    });
}
function augmentProtoMethod(method) {
    return function (proto) {
        var origMethod = proto[method];
        if (method === 'del' && !origMethod) {
            origMethod = proto['delete'];
        }
        proto[method] = function () {
            var args = wrapgf(_slice.call(arguments));
            return origMethod.apply(this, args);
        }
    }
}
