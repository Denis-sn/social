/**
 * Created by den on 25.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'text!templates/profile.html'],
    function(Backbone, _, ModelUser, templateProfile){
      var ProfileView = Backbone.View.extend({
        el: '#mainFrame',
        template: _.template(templateProfile),
        events: {

        },

        initialize: function () {

          var self = this;
          var user = new ModelUser();
          user.fetch({
            success: function (model, res, options) {
              self.model = model;
              self.render();
            },
            error: function (model, res, options) {
              alert('profile fetch error');
            }
          });
        },

        render: function () {
          this.$el.append(this.template(this.model.toJSON()));
          return this;
        }
      });

      return ProfileView;
    });