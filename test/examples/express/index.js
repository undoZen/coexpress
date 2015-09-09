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
    next();
});

app.get('/test', function *(req, res, next) {
    res.body.inAppGet = yield new Promise(function (resolve) {
        setTimeout(function () {
            resolve(true);
        }, 500);
    });
    next();
});

var router = express.Router();
router.all('/test', function *(req, res, next) {
    res.body.inNewRouterAll = yield new Promise(function (resolve) {
        setTimeout(function () {
            resolve(true);
        }, 500);
    });
    res.body.timePassed = Date.now() - res.startedAt;
    next();
});
app.use(router);

app.use(function (req, res, next) {
    res.json(res.body);
})

module.exports = app;
