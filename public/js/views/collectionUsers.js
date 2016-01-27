/**
 * Created by den on 25.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'views/user','collections/friends','text!templates/users.html'],
    function(Backbone, _, ModelUser, ViewUser, CollectionUser, templateUser){
        var ViewUsers = Backbone.View.extend({
            el: '#mainFrame',
            template: _.template(templateUser),
            events: {

            },

            initialize: function () {

                this.$el.append(this.template);
                var self = this;
                var users = new CollectionUser({model: ModelUser});

                users.fetch({
                    success: function (collection, res, options) {
                        self.collection = collection;
                        self.render();
                    },
                    error: function (collection, res, options) {
                        alert('users fetch error');
                    }
                });
            },

            render: function () {

                this.collection.each(function(user) {
                    var viewUser = new ViewUser({model: user});
                    this.$el.append(viewUser.render().el);
                }, this);

                return this;
            }
        });

        return ViewUsers;
    });