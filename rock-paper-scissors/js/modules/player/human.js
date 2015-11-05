define(['jquery', 'underscore', 'backbone',
  'text!templates/playerHuman.html.erb',
  'modules/player'
], function($, _, Backbone,
  Template,
  Player
) {
  var Module = {};

  Module.Model = Player.Model.extend({
    defaults: {
      type: 'human',
      name: 'You'
    }
  });

  Module.View = Player.View.extend({
    template: _.template(Template),

    initialize: function() {
      this.model = new Module.Model();
    },

    cacheElements: function() {
      this.$weapons = this.$el.find('.weapon');
    },

    render: function() {
      this._super('render');
      this.cacheElements();
      this.renderWeapons();

      return this;
    },

    renderWeapons: function() {
      var weapons = this.options.weapons;

      var domFragment = document.createDocumentFragment();
      weapons.forEach(function(weapon) {
        var name = weapon.name();
        domFragment.appendChild(this.make('option', { value: name }, name));
      }, this);
      this.$weapons.append(domFragment);
    },

    selectedWeapon: function() {
      return this.$weapons.find('option:selected').val();
    }
  });

  return Module;
});

