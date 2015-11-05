define(['jquery', 'underscore', 'backbone',
  'modules/weapon',
  'modules/gameEngines/traditional'
], function($, _, Backbone,
  Weapon,
  TraditionalGame
) {
  describe ('Traditional Game', function() {
    var traditionalGame = null;

    beforeEach(function() {
     traditionalGame = new TraditionalGame.Model();
    });

    it ('Should contain all expected traditional weapons', function() {
      expect(traditionalGame.weaponByName('Rock')).toBeTruthy();
      expect(traditionalGame.weaponByName('Paper')).toBeTruthy();
      expect(traditionalGame.weaponByName('Scissor')).toBeTruthy();
    });

    describe('Rules', function() {
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

      it ('Rock should beat Scissor', function() {
        expect(rock.beats(scissor)).toBe(true);
      });

      it ('Scissor should beat Paper', function() {
        expect(scissor.beats(paper)).toBe(true);
      });

      it ('Paper should beat Rock', function() {
        expect(paper.beats(rock)).toBe(true);
      });
    });
  });
});

