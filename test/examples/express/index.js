'use strict';
var express = require('express');
var coexpress = require('../../../');
coexpress(express);

var app = express();

app.use(function *(req, res, next) {
    res.startedAt = Date.now();
    res.body = {};
    res.body.path = yield new Promise(function (resolve) {
        process.nextTick(function () {
            resolve(req.path);
        });
    });
    console.log(1);
    next();
});

app.get('/test', require('bluebird').coroutine(function *(req, res, next) {
    console.log(1.5);
    res.body.wrapped = yield new Promise(function (resolve) {
        resolve(true);
    });
    console.log(2);
    next();
    return 'aaa '+Date.now()
}));

app.get('/test', function *(req, res, next) {
    console.log(1, Date.now());
    res.body.inAppGet = yield new Promise(function (resolve) {
        setTimeout(function () {
    console.log(2, Date.now());
            resolve(true);
        }, 500);
    });
    console.log(3);
    console.log(3, Date.now());
    next();
});

app.get('/test', function (req, res, next) {
    res.body.normal = true;
    next();
});

var router = express.Router();
router.all('/test', function *(req, res, next) {
    console.log(4, Date.now());
    console.log(res.body);
    res.body.inNewRouterAll = yield new Promise(function (resolve) {
        setTimeout(function () {
    console.log(5, Date.now());
            resolve(true);
        }, 500);
    });
    console.log(6, Date.now());
    res.body.timePassed = Date.now() - res.startedAt;
    console.log(res.body);
    next();
});
app.use(router);

app.use(function (req, res, next) {
    res.json(res.body);
})

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status = 500;
    res.end('internal error');
})

module.exports = app;
