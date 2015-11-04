'use strict';

const User = require('../../lib/model/user');

class RecommendationsController {
    static getRecommendationsFor(username) {
        const user = new User(username);

        return user.getRecommendations();
    }
}

module.exports = RecommendationsController;
