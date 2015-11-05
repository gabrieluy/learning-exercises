'use strict';

casper.test.begin('Index Page', function suite(test) {
    casper.start('http://localhost:5000/', function () {
        test.assertTitle('Notes: Home', 'Title is correct');
    });

    casper.then(function () {
        test.assertExists('a[href="#/notes"]', 'Link to notes page is visible');

        this.click('a[href="#/notes"]');
        test.assertEqual(this.getCurrentUrl(), 'http://localhost:5000/#/notes', 'Correctly change page url on a link click');


        casper.waitForSelector('.js-notes-list', function() {
          this.click('a[href="/"]');
        });
    });

    casper.then(function () {
        casper.waitForSelector('.js-notes-list', function () {
            test.assertElementCount('.js-notes-list li', 5, 'Display all 5 latest notes');

            var urls = this.getElementsAttribute('.js-notes-list a', 'href');

            var isUrlsValid = true;
            urls.forEach(function (url) {
                if (!/^#\/notes\/\d+$/.test(url)) {
                    isUrlsValid = false;
                }
            });

            test.assertTruthy(isUrlsValid, 'URLs for each note are valid');

            this.click('a[href="' + urls[0] + '"]');
            test.assertEqual(this.getCurrentUrl(), 'http://localhost:5000/' + urls[0], 'Correctly change page url on a note click');
        }, null, 1000);
    });

    casper.run(function () {
        test.done();
    });
});
