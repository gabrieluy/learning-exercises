'use strict';

const User = require('../../lib/model/user');

class FollowController {
    static follow(usernameFrom, usernameTo) {
        const userFrom = new User(usernameFrom);
        const userTo = new User(usernameTo);

        return userFrom.follow(userTo);
    }
}

module.exports = FollowController;
