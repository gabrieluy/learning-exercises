'use strict';

const app = require('../../lib/app');

const api = require('supertest').agent(app.listen());
const ENDPOINT_ROOT = '/recommendations';

const chai = require('chai');
const expect = chai.expect;

const sandbox = require('sinon').sandbox.create();

const controller = require('../../lib/controller/recommendations');

/*
 * See ../bin/data-load/json-samples/recommendations.json
 */

describe(`ENDPOINT: ${ENDPOINT_ROOT}`, () => {
    before(() => sandbox.stub(controller, 'getRecommendationsFor', () => []));

    after(() => sandbox.restore());

    it('should only accept GET method', done => {
        api.get(ENDPOINT_ROOT)
        .query({ user: 'a' })
        .expect(200)
        .end(err => {
            if (err) { return done(err) };

            api.post(ENDPOINT_ROOT)
            .expect(405, done);
        });
    });

    it('should have an `list` field in GET response', done => {
        api.get(ENDPOINT_ROOT)
        .query({ user: 'a' })
        .expect(200)
        .end((err, res) => {
            if (err) { return done(err) };

            expect(res.body).to.have.property('list');
            done();
        });
    });

    describe('param handling', () => {
        it('should have one param: user', done => {
            api.get(ENDPOINT_ROOT)
            .query({ user: 'a' })
            .expect(200, done);
        });

        it('should return proper error status if wrong number of params', done => {
            api.get(ENDPOINT_ROOT)
            .expect(400, done);
        });
    });
});
