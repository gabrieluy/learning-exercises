Notes Test App
--------------

## Buzzwords used:
  * Backbone + Marionette
  * LocalStorage
  * Browserify
  * Foundation
  * E2E tests with Casper.js
  * Grunt + Livereload + etc

## You might start reading:

  * [DECISIONS.md](DECISIONS.md) - Some technologies and approaches I decided to go with along the way.
  * [KNOWN_ISSUES.md](KNOWN_ISSUES.md) - Some known issues the app still has to the date.
  * [TODO.md](TODO.md) - Some stuff I'd like to get done or improve in the future.

## Giving it a go:

```shell
npm install -g grunt-cli
npm install
grunt build # build initial css and js files
grunt dev # development (server)
grunt test # run all integration tests (in order to run tests, you've to have server running with grunt dev)
```

