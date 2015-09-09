# coexpress
let your express app.use(function * (req, res, next) {})

## install

```bash
npm i --save coexpress
```

## usage

```js
var express = require('express');
require('coexpress')(express);

var app = express();
app.use(function *(req, res, next) {
    res.local.hello = yield new Promise(function (resolve) {
        resolve('world');
    });
    next();
});
```

## license
MIT
