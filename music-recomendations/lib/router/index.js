'use strict';

const mainRouter = require('koa-router')();
const listenRouter = require('./listen');
const followRouter = require('./follow');
const recommendationsRouter = require('./recommendations');

mainRouter.use(listenRouter.routes());
mainRouter.use(followRouter.routes());
mainRouter.use(recommendationsRouter.routes());

module.exports = mainRouter;
