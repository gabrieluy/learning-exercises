'use strict';

const app = require('../../lib/app');

const api = require('supertest').agent(app.listen());
const ENDPOINT_ROOT = '/listen';

const sandbox = require('sinon').sandbox.create();

const noop = function *() {};
const controller = require('../../lib/controller/listen');

/*
 * See ../bin/data-load/json-samples/listen.json
 */

describe(`ENDPOINT: ${ENDPOINT_ROOT}`, () => {
    before(() => sandbox.stub(controller, 'listen', noop));

    after(() => sandbox.restore());

    it('should only accept POST method', done => {
        api.post(ENDPOINT_ROOT)
        .send({ user: 'a', music: 'm1' })
        .expect(200)
        .end(err => {
            if (err) { return done(err) };

            api.get(ENDPOINT_ROOT)
            .expect(405, done);
        });
    });

    describe('param handling', () => {
        it('should have two params: user and music', done => {
            api.post(ENDPOINT_ROOT)
            .send({ user: 'a', music: 'm1' })
            .expect(200, done);
        });

        it('should return proper error status if wrong number of params', done => {
            api.post(ENDPOINT_ROOT)
            .set('Content-Type', 'application/json')
            .expect(400)
            .end(err => {
                if (err) { return done(err) };

                api.post(ENDPOINT_ROOT)
                .send({ user: 'onlyOneParam' })
                .expect(400, done);
            });
        });
    });
});
