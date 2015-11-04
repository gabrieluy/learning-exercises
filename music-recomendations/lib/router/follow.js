'use strict';

const Router = require('koa-router');
const parse = require('co-body');

const router = new Router({
    prefix: '/follow',
    methods: ['POST']
});

const controller = require('../controller/follow');

router.use(router.allowedMethods());

router.post('/', function *() {
    const body = yield parse(this);

    if (!body.to || !body.from) {
        this.throw(400, '`from` and `to` are required');
    }

    yield controller.follow(body.from, body.to);
    this.status = 200;
});

module.exports = router;
