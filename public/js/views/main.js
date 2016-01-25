/**
 * Created by den on 24.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'models/post', 'text!templates/main.html'],
    function (Backbone, _, ModelUser, ModelPost, templateMain) {
        var MainView = Backbone.View.extend({
            el: '#content',
            template: _.template(templateMain),
            events: {
                'click #logout': 'logout',
                'click #submitNewPost': 'submitNewPost'
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
                        alert('main render error');
                    }
                });
            },

            submitNewPost: function (event) {
                event.preventDefault();

                var newPost = this.$el.find('#newPost').val();
                this.$el.find('#newPost').val('');
                var data = {
                    text: newPost,
                    userId: this.model.get('_id')
                };

                var post = new ModelPost();
                post.urlRoot = '/post';
                post.save(data, {
                    success: function (res, xhr) {
                        App.loggedIn = true;
                        localStorage.setItem('loggedIn', true);
                        Backbone.history.navigate('main', {trigger: true});
                    },
                    error: function () {
                        alert('main post error');
                    }
                });
            },

            logout: function () {

                var user = new ModelUser();
                user.urlRoot = '/logout';
                user.save(null, {
                    success: function (res, xhr) {
                        App.loggedIn = false;
                        localStorage.setItem('loggedIn', false);
                        Backbone.history.navigate('login', {trigger: true});
                    },
                    error: function () {
                        alert('user.save error');
                    }
                });
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }
        });

        return MainView;
    });