'use strict';
var express = require('express');
var coexpress = require('../../../');
coexpress.augment(express.application);


module.exports = function newApp() {
    var app = express();
    app.express = express;
    require('../common-use')(app);
    // require('../use-router')(app, express);
    return app;
};
