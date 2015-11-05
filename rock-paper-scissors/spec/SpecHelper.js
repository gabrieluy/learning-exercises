beforeEach(function() {
  this.addMatchers({
    toBeat: function(expectedWeapon) {
      var weapon = this.actual;
      return weapon.get('beats').indexOf(expectedWeapon.get('name'))  !== -1;
    }
  });
});

