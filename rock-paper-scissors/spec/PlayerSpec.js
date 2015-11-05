define(['jquery', 'underscore', 'backbone',
  'modules/player/human',
  'modules/player/cpu'
], function($, _, Backbone,
  Human,
  CPU
) {
  describe ('Player', function() {
    it ('A human should have a human type', function() {
      var human = new Human.Model();
      expect(human.type()).toEqual('human');
    });

    it ('A CPU should have a cpu type', function() {
      var cpu = new CPU.Model();
      expect(cpu.type()).toEqual('cpu');
    });
  });
});

