'use strict';

casper.test.begin('Note Page', function suite(test) {
    casper.start('http://localhost:5000/#/notes/2', function () {
        test.assertTitle('Notes: Note #2', 'Title is correct');
    });

    casper.then(function () {
        test.assertExists('a[href="/"]', 'Link to index page is visible');
    });

    casper.then(function () {
        casper.waitForSelector('.js-notes-list', function () {
            test.assertElementCount('.js-notes-list li', 10, 'Display all notes');
        }, null, 1000);

        casper.waitForSelector('h2.title', function () {
            test.assertExists('h2.title', 'Current note title is visible');
            test.assertExists('p.description', 'Current note description is visible');
            test.assertExists('.js-remove-note', 'Current note remove button is visible');
            test.assertExists('.js-close-note', 'Close button is visible');

            test.assertTruthy(this.getElementsAttribute('h2.title', 'text'), 'Note title contains text');
            test.assertTruthy(this.getElementsAttribute('p.description', 'text'), 'Note description contains text');
        }, null, 1000);
    });

    casper.then(function () {
        this.click('.js-close-note');
        test.assertEqual(this.getCurrentUrl(), 'http://localhost:5000/#/notes', 'Correctly change page url after note details has been closed');
    });

    casper.then(function () { this.click('.js-notes-list li:first-child a'); });
    casper.then(function () { this.click('.js-remove-note'); });

    casper.then(function() {
      test.assertElementCount('.js-notes-list li', 9, 'Allow for removing single notes');
      test.assertEqual(this.getCurrentUrl(), 'http://localhost:5000/#/notes', 'Correctly change page url after note has been removed');
      test.assertDoesntExist('h2.title', 'Current note title is note visible after note has been removed');
      test.assertDoesntExist('p.description', 'Current note description is note visible after note has been removed');
      test.assertDoesntExist('.js-remove-note', 'Current note remove button is note visible after note has been removed');
      test.assertDoesntExist('.js-close-note', 'Close button is note visible after note has been removed');
    });

    casper.run(function () {
        test.done();
    });
});
