Known Issues
------------

## PhantomJS + LocalStorage

Please see `scripts/router/index.js:37`

That block would make the app not being reloaded when click the index link.
But due a bug on PhantomJS + LocalStorage, it makes the tests break.
See https://twitter.com/phantomjs/status/336841757612449792
Because of this, the list will always be reseted (re-init'ed) when navigating back to index.
If using in-memory only or regular network (rest) calls, this wouldn't be a problem...

## Modules reuse

I could make some similar modules inherit and reuse more code, or even drop the need of them.
Example: the header modules.
Feels like a bit of over engineering.
