define(['jquery', 'underscore', 'backbone'
], function($, _, Backbone
) {
  var Module = {};

  Module.Model = Backbone.Model.extend({
    defaults: {
      chosenWeapon: null
    },

    chooseWeapon: function(weapon) {
      this.set({ chosenWeapon: weapon });
    },

    chosenWeapon: function() {
      return this.get('chosenWeapon');
    },

    type: function() {
      return this.get('type');
    },

    weapon: function(weapon) {
      if (weapon) {
        this.chooseWeapon(weapon);
      }
      return this.chosenWeapon();
    }
  });

  Module.View = Backbone.View.extend({
    render: function() {
      this.$el.empty().append(this.template(this.model));

      return this;
    },

    type: function() {
      return this.model.type();
    },

    weapon: function(weapon) {
      return this.model.weapon(weapon);
    }
  });

  return Module;
});

