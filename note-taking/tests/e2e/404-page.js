'use strict';

casper.test.begin('404 Page', function suite(test) {
    casper.start('http://localhost:5000/#/foo', function () {
        test.assertTitle('Notes: 404', 'Title on /foo 404 page is correct');
    });

    casper.thenOpen('http://localhost:5000/#/bar');

    casper.then(function () {
        test.assertTitle('Notes: 404', 'Title on /bar 404 page is correct');
    });

    casper.then(function () {
        test.assertExists('a[href="/"]', 'Link to index page is visible');
        test.assertExists('a[href="#/notes"]', 'Link to notes page is visible');
        test.assertExists('h2.message', 'Not found message is visible');
        test.assertEqual(this.fetchText('h2'), '404 Not Found', 'Not found message is correct');
    });

    casper.run(function () {
        test.done();
    });
});
