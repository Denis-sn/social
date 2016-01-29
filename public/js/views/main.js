/**
 * Created by den on 24.01.16.
 */
define(['Backbone',
    'Underscore',
    'models/user',
    'models/post',
    'text!templates/main.html'],
    function (Backbone, _, ModelUser, ModelPost, templateMain) {
        var MainView = Backbone.View.extend({
            el: '#wrapper',
            template: _.template(templateMain),
            events: {
                'click #logout': 'logout',
                'click #btnMainPosts': 'posts',
                'click #btnMainUsers': 'users',
                'click #btnMainProfile': 'profile'
            },

            initialize: function (View) {
                var self = this;
                var user = new ModelUser();
                user.fetch({
                    success: function (model, res, options) {
                        self.model = model;
                        self.render();
                        new View();
                    },
                    error: function (model, res, options) {
                        alert('main render error');
                    }
                });
            },

            logout: function () {

                var user = new ModelUser();
                user.urlRoot = '/logout';
                user.save(null, {
                    success: function (res, xhr) {
                        App.isLogged = false;
                        localStorage.setItem('loggedIn', false);
                        Backbone.history.navigate('login', {trigger: true});
                    },
                    error: function () {
                        alert('user.save error');
                    }
                });
            },

            posts: function () {
                Backbone.history.navigate('posts', {trigger: true});
            },

            users: function () {
                var input = this.$el.find('#inputMainFindFriends').val();
                if(input){
                    alert('find friend by ' + input);
                    Backbone.history.navigate('users', {trigger: true});
                } else {
                    Backbone.history.navigate('users', {trigger: true});
                }
            },

            profile: function () {
                Backbone.history.navigate('profile', {trigger: true});
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return MainView;
    });