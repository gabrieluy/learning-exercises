Simple Music Recommendations
============================

# Install

Install Node (>= 4) and MongoDB in your preffered way. And then run:

```shell
npm run setup
```

# Load initial data

```shell
npm run db:test:load
```

or:

```shell
npm run db:production:load
```

# Run app

First start MongoDB (in a separate window shell):

```shell
npm run db:run
```

Then run the app:

```shell
npm start
```

# Run tests

```shell
npm test
```

# Journal and other docs

I'm keeping a [JOURNAL.md](./docs/JOURNAL.md) file with decisions and other thoughts during this development. Check it out.
Other docs have been moved to [`/docs`](./docs) folder just to keep things more tidy in the app's root folder.

# Ideas

- Try out `otto` for development and deployment
