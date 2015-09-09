'use strict';
var tape = require('tape');
var coexpress = require('../../');
tape('wrapAllGeneratorFunction', function (test) {
    var arr = [1, 'hi', function *(){}, function (){}, function *(){}];
    function countGeneratorFunction (arr) {
        var GeneratorFunction = (function *(){}).constructor;
        return arr.reduce(function (t, v) {
            return t + (v instanceof GeneratorFunction
                    ? 1
                    : 0);
        }, 0);
    }
    test.plan(2);
    test.equal(countGeneratorFunction(arr), 2);
    var results = coexpress.wrapAllGeneratorFunction(arr);
    test.equal(countGeneratorFunction(results), 0);
})
