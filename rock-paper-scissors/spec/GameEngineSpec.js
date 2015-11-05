define(['jquery', 'underscore', 'backbone',
  'modules/gameEngine',
  'modules/weapon'
], function($, _, Backbone,
  GameEngine,
  Weapon
) {
  describe ('Game Engine - Core', function() {
    var rock = new Weapon.Model({
      name: 'Rock',
      beats: ['Scissor']
    });

    var paper = new Weapon.Model({
      name: 'Paper',
      beats: ['Rock']
    });

    var scissor = new Weapon.Model({
      name: 'Scissor',
      beats: ['Paper']
    });

    var ge = null;

    beforeEach(function() {
     ge = new GameEngine.Model();
    });

    it ('Should be able to add weapons', function() {
      var weaponsBefore = ge.get('weapons').length;
      ge.addWeapon(rock);
      ge.addWeapon(paper);

      var weaponsAfter = ge.get('weapons').length;

      expect(weaponsAfter).toBe(weaponsBefore + 2);
    });

    it ('Should judge right', function() {
      ge.chooseWeapon1(paper);
      ge.chooseWeapon2(rock);

      var winner = ge.judge()[0];

      expect(winner).toEqual(paper);
    });

    it ('Should be able to locate a weapon by its name', function() {
      var key = 'Rock';
      ge.addWeapon(rock);
      ge.addWeapon(paper);

      var weapon = ge.weaponByName(key);
      expect(weapon.name()).toEqual(key);
    });
  });
});

