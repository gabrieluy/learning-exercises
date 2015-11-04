'use strict';

const User = require('../../lib/model/user');

class ListenController {
    static listen(username, songTitle) {
        const user = new User(username);

        return user.listenTo(songTitle);
    }
}

module.exports = ListenController;
