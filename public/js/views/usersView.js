/**
 * Created by den on 25.01.16.
 */
define(['Backbone',
        'Underscore',
        'models/user',
        'views/user',
        'collections/friends',
        'text!templates/users.html',
        'moment'],
    function (Backbone, _, ModelUser, ViewUser, CollectionUser, templateUser, moment) {
        var UsersView = Backbone.View.extend({
            el: '#mainFrame',
            template: _.template(templateUser),
            events: {
                'click #addFriend':'addFriend',
                'click #removeFriend':'removeFriend'
            },

            initialize: function () {
                this.$el.empty();
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

            addFriend:function(event){
                alert('add friend: ' + event.target.name);
            },

            removeFriend:function(event){
                alert('remove friend: ' + event.target.name);
            },

            render: function () {

                this.collection.each(function (user) {
                    user.set({'birthday': moment(user.get('birthday')).format('YYYY-MM-DD')});
                    var viewUser = new ViewUser({model: user});
                    this.$el.append(viewUser.render().el);
                }, this);

                return this;
            }
        });

        return UsersView;
    });