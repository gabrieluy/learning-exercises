'use strict';

const chai = require('chai');
const expect = chai.expect;

const sortOrderComparator = require('../lib/sort-order-comparator');

describe('SORT ORDER COMPARATOR', () => {
    // Sanity, more-of-a-documentation-kind-of test:
    it('should compare the sortOrder property ordinally', () => {
        const testData = [
            { title: 'Second element', sortOrder: 9 },
            { title: 'First element', sortOrder: 3 }
        ];

        const sortedData = testData.sort(sortOrderComparator);

        expect(sortedData[0].title).to.be.equal('First element');
        expect(sortedData[1].title).to.be.equal('Second element');
    });
});
