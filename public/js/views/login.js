/**
 * Created by den on 24.01.16.
 */
define(['Backbone',
    'Underscore',
    'models/user',
    'text!templates/login.html'],
    function (Backbone, _, ModelUser, templateLogin) {
        var LoginView = Backbone.View.extend({
            el: '#wrapper',
            template: _.template(templateLogin),
            events: {
                'click #loginSubmit': 'login'
            },
            initialize: function () {
                this.render();
            },

            login: function (event) {
                event.preventDefault();

                var email = this.$el.find('#email').val();
                var password = this.$el.find('#password').val();
                var data = {
                    email: email,
                    password: password
                };

                var user = new ModelUser();
                user.urlRoot = '/login';
                user.save(data, {
                    success: function (res, xhr) {
                        App.isLogged = true;
                        localStorage.setItem('loggedIn', true);
                        Backbone.history.navigate('posts', {trigger: true});
                    },
                    error: function () {
                        alert('Sorry, wrong login or password!');
                    }
                });
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            }
        });

        return LoginView;
    });