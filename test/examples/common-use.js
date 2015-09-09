'use strict';
module.exports = function (app) {
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
};
