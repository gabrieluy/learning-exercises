define(['jquery', 'underscore', 'backbone',
  'modules/gameController'
], function($, _, Backbone,
  GameController
) {
  describe ('Game Controller', function() {
    var game;
    var gameView;
    beforeEach(function() {
      gameView = new GameController.View();
      game = gameView.model;
    });

    describe('Game modes', function() {
      it ('Should load a traditional game by default', function() {
        expect(gameView.model.mode()).toEqual('traditional');
      });

      it ('Should be able to change between different game modes', function() {
        expect(game.mode()).toEqual('traditional');
        game.mode('lizard-spock');
        expect(game.mode()).toEqual('lizard-spock');
      });
    });

    describe ('Weapon selection', function() {
      it ('Should pick a random weapon for cpu player', function() {
        var weapon = gameView.pickRandomWeapon();
        expect(weapon).toBeTruthy();
      });

      it ('Should get a weapon model out of a string', function() {
        var name = 'Rock';
        var weapon = gameView.weaponByName(name);
        expect(weapon.name()).toEqual(name);
      });
    });
  });
});

