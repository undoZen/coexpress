'use strict';
module.exports = function (app, express) {
    app.use(function (req, res, next) {
        res.body.timePassed = Date.now() - res.startedAt;
        res.json(res.body);
    })
};
