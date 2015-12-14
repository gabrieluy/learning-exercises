'use strict';

const chai = require('chai');
const expect = chai.expect;

const dataTreeToPlainText = require('../../lib/util/plain-text-tree');

describe('TREE TO PLAIN TEXT', () => {
    it('should display whether a task is starred or not', () => {
        const notStarredTask = [{
            type: 'task',
            starred: false,
            title: 'No Star'
        }];
        const starredTask = [{
            type: 'task',
            starred: true,
            title: 'Star'
        }];

        expect(dataTreeToPlainText(notStarredTask)).to.equal('TASK: No Star');
        expect(dataTreeToPlainText(starredTask)).to.equal('TASK: Star (*)');
    });

    it('should recurse if there is .children present', () => {
        const aListWithTask = [{
            type: 'list',
            title: 'My list',
            children: [{
                type: 'task',
                title: 'My task'
            }]
        }];

        expect(dataTreeToPlainText(aListWithTask)).to.equal('LIST: My list\n  TASK: My task');
    });
});
