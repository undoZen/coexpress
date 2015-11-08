'use strict';
var http = require('http');
var tape = require('tape');
var proagent = require('promisingagent');
var co = require('co');

tape('augment express', function (test) {
    var app = require('../examples/express');
    var server = http.createServer(app);
    test.plan(6);

    server.listen(function () {
        var port = this.address().port;
        co(function *() {
            console.log('port:', port);
            var r = yield proagent('GET', 'http://127.0.0.1:' + port + '/test');
            var body = r.body;
            console.log(body);
            test.equal(body.path, '/test');
            test.ok(body.wrapped);
            test.ok(body.normal);
            test.ok(body.inAppGet);
            test.ok(body.inNewRouterAll);
            test.ok(body.timePassed >= 1000);
            server.close();
        });
    });
})
