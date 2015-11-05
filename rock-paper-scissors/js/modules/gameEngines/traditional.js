define(['jquery', 'underscore', 'backbone',
  'modules/weapon',
  'modules/gameEngine'
], function($, _, Backbone,
  Weapon,
  GameEngine
) {
  var Module = {};

  Module.Model = GameEngine.Model.extend({
    initialize: function() {
      this._super('initialize');

      var rock = new Weapon.Model({ name: 'Rock', beats: ['Scissor'] });
      var paper = new Weapon.Model({ name: 'Paper', beats: ['Rock'] });
      var scissor = new Weapon.Model({ name: 'Scissor', beats: ['Paper'] });
      this.addWeapon(rock)
          .addWeapon(paper)
          .addWeapon(scissor);

      return this;
    }
  });

  Module.View = GameEngine.View.extend({
    initialize: function() {
      this.model = new Module.Model();

      return this;
    },

    phrasesDict: function(weapon1, weapon2) {
      var actions = {
        'Rock': { 'Scissor': 'crushes' },
        'Paper': { 'Rock': 'covers' },
        'Scissor': { 'Paper': 'cuts' }
      };

      _.each(actions, function(value, key, list) {
        list[key][key] = 'is drawn by another';
      });
      return actions[weapon1] && actions[weapon1][weapon2];
    }
  });

  return Module;
});

