define(['jquery', 'underscore', 'backbone'
], function($, _, Backbone
) {
  var Module = {};

  Module.Model = Backbone.Model.extend({
    defaults: {
      chosenWeapon1: null,
      chosenWeapon2: null,
      weapons: []
    },

    initialize: function() {
      this.set({ weapons: [] });
    },

    addWeapon: function(weapon) {
      var currentWeapons = this.weapons();
      currentWeapons.push(weapon);

      this.set('weapons', currentWeapons);

      return this;
    },

    weapons: function() {
      return this.get('weapons');
    },

    chooseWeapon1: function(weapon) {
      this.set({ chosenWeapon1: weapon });
    },

    chooseWeapon2: function(weapon) {
      this.set({ chosenWeapon2: weapon });
    },

    judge: function() {
      var chosenWeapon1 = this.get('chosenWeapon1');
      var chosenWeapon2 = this.get('chosenWeapon2');
      var weapons = [chosenWeapon1, chosenWeapon2];

      if (chosenWeapon1.name() === chosenWeapon2.name()) {
        return weapons;
      }

      if (chosenWeapon1.beats(chosenWeapon2)) {
        return weapons;
      } else if (chosenWeapon2.beats(chosenWeapon1)) {
        return weapons.reverse();
      } else {
        throw 'Faulty rules: unable to determine who beats who between: ' + chosenWeapon1.name()  +' and '+ chosenWeapon2.name();
      }
    },

    weaponByName: function(name) {
      return _.find(this.weapons(), function(weapon) {
        return weapon.name() === name;
      });
    }
  });

  Module.View = Backbone.View.extend({
    addWeapon: function(weapon) {
      this.model.addWeapon(weapon);
    },

    chooseWeapon1: function(weapon) {
      this.model.chooseWeapon1(weapon);
    },

    chooseWeapon2: function(weapon) {
      this.model.chooseWeapon2(weapon);
    },

    weaponByName: function(name) {
      return this.model.weaponByName(name);
    },

    weapons: function() {
      return this.model.weapons();
    },

    judge: function() {
      var result = this.model.judge();
      var weapon1 = result[0].name();
      var weapon2 = result[1].name();
      var action = this.phrasesDict(weapon1, weapon2);

      return [weapon1, action, weapon2].join(' ');
    }
  });

  return Module;
});

