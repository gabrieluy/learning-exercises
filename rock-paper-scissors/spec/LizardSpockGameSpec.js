define(['jquery', 'underscore', 'backbone',
  'modules/weapon',
  'modules/gameEngines/lizardSpock'
], function($, _, Backbone,
  Weapon,
  LizardSpock
) {
  describe ('Lizard-Spock Game', function() {
    var lizardSpockGame = null;

    beforeEach(function() {
     lizardSpockGame = new LizardSpock.Model();
    });

    it ('Should contain all expected traditional weapons plus new weapons', function() {
      expect(lizardSpockGame.weaponByName('Rock')).toBeTruthy();
      expect(lizardSpockGame.weaponByName('Paper')).toBeTruthy();
      expect(lizardSpockGame.weaponByName('Scissor')).toBeTruthy();
      expect(lizardSpockGame.weaponByName('Spock')).toBeTruthy();
      expect(lizardSpockGame.weaponByName('Lizard')).toBeTruthy();
    });

    describe('Rules', function() {
      var rock = new Weapon.Model({
        name: 'Rock',
        beats: ['Scissor', 'Lizard']
      });

      var paper = new Weapon.Model({
        name: 'Paper',
        beats: ['Rock', 'Spock']
      });

      var scissor = new Weapon.Model({
        name: 'Scissor',
        beats: ['Paper', 'Lizard']
      });

      var lizard = new Weapon.Model({
        name: 'Lizard',
        beats: ['Paper', 'Spock']
      });

      var spock = new Weapon.Model({
        name: 'Spock',
        beats: ['Scissor', 'Rock']
      });

      it ('Rock should beatn Scissor & Lizard', function() {
        expect(rock.beats(scissor)).toBe(true);
        expect(rock.beats(lizard)).toBe(true);
      });

      it ('Scissor should beat Paper & Lizard', function() {
        expect(scissor.beats(paper)).toBe(true);
        expect(scissor.beats(lizard)).toBe(true);
      });

      it ('Paper should beat Rock & Spock', function() {
        expect(paper.beats(rock)).toBe(true);
        expect(paper.beats(spock)).toBe(true);
      });

      it ('Lizard should beat Paper & Spock', function() {
        expect(lizard.beats(paper)).toBe(true);
        expect(lizard.beats(spock)).toBe(true);
      });

      it ('Spock should beat Rock & Scissor', function() {
        expect(spock.beats(rock)).toBe(true);
        expect(spock.beats(scissor)).toBe(true);
      });
    });
  });
});

