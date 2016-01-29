/**
 * Created by den on 24.01.16.
 */
define(['Backbone',
        'Underscore',
        'models/user',
        'text!templates/register.html'],
    function (Backbone, _, ModelUser, templateRegister) {
        var RegisterView = Backbone.View.extend({
            el: '#wrapper',
            template: _.template(templateRegister),
            events: {
                'click #registerSubmit': 'register',
                'click #btnLocation': 'getLocation'
            },

            initialize: function () {
                $('#mainFrame').empty();
                this.render();
            },

            register: function (event) {
                event.preventDefault();

                var name = this.$el.find('#name').val();
                var birthday = this.$el.find('#birthday').val();
                var avatar = this.$el.find('#avatar').val();
                var location = [this.latitude, this.longitude];
                var email = this.$el.find('#email').val();
                var password = this.$el.find('#password').val();

                var data = {
                    name: name,
                    birthday: birthday,
                    avatar: avatar,
                    location: location,
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

            getLocation: function (event) {
                var self = this;
                event.preventDefault();
                var output = this.$el.find('#location');

                if (!navigator.geolocation) {
                    alert("Geolocation is not supported by your browser");
                    return;
                }

                function success(position) {
                    self.latitude = position.coords.latitude;
                    self.longitude = position.coords.longitude;

                    output.val('Latitude is ' + self.latitude + '° Longitude is ' + self.longitude + '°');
                }

                function error() {
                    alert("Unable to retrieve your location");
                }

                navigator.geolocation.getCurrentPosition(success, error, {timeout:1000});
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            }
        });

        return RegisterView;
    });