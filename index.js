'use strict';
var conext = require('conext');
var methods = require('methods');

module.exports = exports = function (express) {
    augmentRouter(express.Router);
    augmentRoute(express.Route.prototype);
}

var wrapgf = exports.wrapAllGeneratorFunction = function (args) {
    var GeneratorFunction = (function *(){}).constructor;
    var results = args.slice();
    args.forEach(function (arg, i) {
        if ((typeof arg === 'function' && arg instanceof GeneratorFunction) ||
            (typeof arg.__generatorFunction__ === 'function' &&
                arg.__generatorFunction__ instanceof GeneratorFunction)) {
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
        proto[method] = (function(origMethod) {
            return function () {
                var args = wrapgf(_slice.call(arguments));
                return origMethod.apply(this, args);
            }
        }(proto[method]));
    }
}
