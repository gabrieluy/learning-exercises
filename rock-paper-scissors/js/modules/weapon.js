define(['jquery', 'underscore', 'backbone'
], function($, _, Backbone
) {
  var Module = {};

  Module.Model = Backbone.Model.extend({
    defaults: {
      name: '',
      beats: []
    },

    beats: function(otherWeapon) {
      if (otherWeapon) {
        return this.get('beats').indexOf(otherWeapon.name()) !== -1;
      } else {
        return this.get('beats');
      }
    },

    name: function() {
      return this.get('name');
    }
  });

  Module.View = Backbone.View.extend({
  });

  return Module;
});

