'use strict';

const koa = require('koa');
const router = require('./router');

const app = koa();
const SERVER_PORT = 5000;

const log = require('./logger');

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', err => {
    log('Server error:', err);
});

if (!module.parent) {
    app.listen(SERVER_PORT, () => {
        log(`Server listening on: ${SERVER_PORT}`);
    });
}

module.exports = app;
