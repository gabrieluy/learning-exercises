'use strict';

const Router = require('koa-router');
const parse = require('co-body');

const router = new Router({
    prefix: '/listen',
    methods: ['POST']
});

const controller = require('../controller/listen');

router.use(router.allowedMethods());

router.post('/', function *() {
    const body = yield parse(this);

    if (!body.user || !body.music) {
        this.throw(400, '`user` and `music` are required');
    }

    yield controller.listen(body.user, body.music);
    this.status = 200;
});

module.exports = router;
