/**
 * Created by den on 24.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'text!templates/register.html'],
    function(Backbone, _, ModelUser, templateRegister){
        var RegisterView = Backbone.View.extend({
            el: '#wrapper',
            template: _.template(templateRegister),
            events:{
                'click #registerSubmit':'register'
            },
            initialize: function(){
                this.render();
            },

            register: function(){
                event.preventDefault();

                var name = this.$el.find('#name').val();
                var email = this.$el.find('#email').val();
                var password = this.$el.find('#password').val();

                var data = {
                    name: name,
                    email: email,
                    password: password
                };

                var user = new ModelUser();
                user.urlRoot = '/register';
                user.save(data, {
                    success: function (res, xhr) { //res ответ бекЭнда!!!
                        App.isLogged = true;
                        localStorage.setItem('loggedIn', true);
                        Backbone.history.navigate('posts', {trigger: true});
                    },
                    error: function () {
                        alert('register error');
                    }
                });
            },

            render: function(){
                this.$el.html(this.template());
                return this;
            }
        });

        return RegisterView;
    });