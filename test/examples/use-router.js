'use strict';
module.exports = function (app, express) {
    var router = express.Router();
    console.log(11);
    router.all('/test', function *(req, res, next) {
        console.log('in router');
        res.body.inNewRouterAll = yield new Promise(function (resolve) {
            setTimeout(function () {
                resolve(true);
            }, 500);
        });
        next();
    });
    console.log(router);
    app.use(router);
    console.log('app._router.stack', app._router.stack.map(function (l, i) {
        return [i, l.handle.toString()];
    }));
    //console.log(app._router);
};
