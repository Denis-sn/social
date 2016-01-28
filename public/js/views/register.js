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
                this.render();
            },

            register: function () {
                event.preventDefault();

                var name = this.$el.find('#name').val();
                var avatar = this.$el.find('#avatar').val();
                var location = [this.getLocation.latitude, this.getLocation.latitude];
                var email = this.$el.find('#email').val();
                var password = this.$el.find('#password').val();

                var data = {
                    name: name,
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
                event.preventDefault();
                var output = this.$el.find('#location');
                var latitude;
                var longitude;

                if (!navigator.geolocation) {
                    alert("Geolocation is not supported by your browser");
                    return;
                }

                function success(position) {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;

                    output.val('Latitude is ' + latitude + '° Longitude is ' + longitude + '°');
                }

                function error() {
                    alert("Unable to retrieve your location");
                }

                navigator.geolocation.getCurrentPosition(success, error);
            },

            render: function () {
                this.$el.html(this.template());
                return this;
            }
        });

        return RegisterView;
    });