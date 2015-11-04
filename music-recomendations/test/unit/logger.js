'use strict';

const sinon = require('sinon');
const sinonChai = require('sinon-chai')

const chai = require('chai');
const expect = chai.expect;
chai.use(sinonChai);

const log = require('../../lib/logger');

describe('UTIL: Logger', () => {
    it('should not be verbose when NODE_ENV=test', () => {
        const logStub = sinon.stub(console, 'log');
        const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

        process.env.NODE_ENV = 'test';
        log('    console.log test');
        expect(logStub).to.not.be.called;

        process.env.NODE_ENV = 'else';
        log('    console.log test');
        expect(logStub).to.be.called;

        logStub.restore();
        process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    });
});

