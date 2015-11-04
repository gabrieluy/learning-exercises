'use strict';

const Router = require('koa-router');

const router = new Router({
    prefix: '/recommendations',
    methods: ['GET']
});

const controller = require('../controller/recommendations');

router.use(router.allowedMethods());

router.get('/', function *() {
    if (!this.query.user) {
        this.throw(400, '`user` is required');
    }

    const recommendations = yield controller.getRecommendationsFor(this.query.user);
    this.body = { list: recommendations };
    this.status = 200;
});

module.exports = router;
