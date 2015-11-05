'use strict';

casper.test.begin('Notes Page', function suite(test) {
    casper.start('http://localhost:5000/#/notes', function () {
        test.assertTitle('Notes: List', 'Title is correct');
    });

    casper.then(function () {
        test.assertExists('a[href="/"]', 'Link to index page is visible');
    });

    casper.then(function () {
        casper.waitForSelector('.js-notes-list', function () {
            test.assertElementCount('.js-notes-list li', 10, 'Display all notes');

            var urls = this.getElementsAttribute('.js-notes-list a', 'href');

            var isUrlsValid = true;
            urls.forEach(function (url) {
                if (!/^#\/notes\/\d+$/.test(url)) {
                    isUrlsValid = false;
                }
            });

            test.assertTruthy(isUrlsValid, 'URLs for each note are valid');

            this.click('a[href="' + urls[5] + '"]');
            test.assertEqual(this.getCurrentUrl(), 'http://localhost:5000/' + urls[5], 'Correctly change page url on a note click');
            this.back();
        }, null, 1000);
    });

    casper.then(function () {
        this.fill('.js-add-note', {
            title: 'Foo',
            description: ''
        }, true);

        this.fill('.js-add-note', {
            title: '',
            description: 'Bar'
        }, true);

        test.assertElementCount('.js-notes-list li', 10, 'Disallow for adding new notes if all fields are not filled');

        this.fill('.js-add-note', {
            title: 'Foo',
            description: 'Bar'
        }, true);

        test.assertElementCount('.js-notes-list li', 11, 'Allow for adding new notes');
        test.assertField('title', '', 'Clear title field after new note has been added');
        test.assertField('description', '', 'Clear description field after new note has been added');

        var urls = this.getElementsAttribute('.js-notes-list a', 'href');

        this.click('a[href="' + urls[urls.length - 1] + '"]');

        test.assertEqual(this.getCurrentUrl(), 'http://localhost:5000/' + urls[urls.length - 1], 'Correctly change page url on a newly added note click');

        casper.waitForSelector('h2.title', function () {
            test.assertExists('h2.title', 'Current note title is visible');
            test.assertExists('p.description', 'Current note description is visible');
            test.assertExists('.js-remove-note', 'Current note remove button is visible');
            test.assertExists('.js-close-note', 'Close button is visible');
        }, null, 1000);
    });

    casper.then(function () {
      this.click('a[href="/"]');
    });

    casper.run(function () {
        test.done();
    });
});
