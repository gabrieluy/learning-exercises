define(['jquery', 'underscore', 'backbone',
  'modules/weapon',
  'modules/gameEngines/traditional'
], function($, _, Backbone,
  Weapon,
  Traditional
) {
  var Module = {};

  Module.Model = Traditional.Model.extend({
    initialize: function() {
      this._super('initialize');

      var lizard = new Weapon.Model({
        name: 'Lizard',
        beats: ['Spock', 'Paper']
      });

      var spock = new Weapon.Model({
        name: 'Spock',
        beats: ['Scissor', 'Rock']
      });

      this.addWeapon(lizard)
          .addWeapon(spock);

      // Updating rules:
      this.weaponByName('Rock').beats().push('Lizard');
      this.weaponByName('Paper').beats().push('Spock');
      this.weaponByName('Scissor').beats().push('Lizard');

      return this;
    }
  });

  Module.View = Traditional.View.extend({
    initialize: function() {
      this.model = new Module.Model();
    },

    phrasesDict: function(weapon1, weapon2) {
      var result = this._super('phrasesDict', [weapon1, weapon2]);

      if (!result) {
        var actions = {
          'Rock': { 'Lizard': 'crushes' },
          'Paper': { 'Spock': 'disproves' },
          'Scissor': { 'Lizard': 'decapitates' },
          'Spock': {
            'Scissor': 'smashes',
            'Rock': 'vaporizes'
          },
          'Lizard': {
            'Paper': 'eats',
            'Spock': 'poisons'
          }
        };

        _.each(actions, function(value, key, list) {
          list[key][key] = 'is drawn by another';
        });

        result = actions[weapon1][weapon2];
      }

      return result;
    }
  });

  return Module;
});

