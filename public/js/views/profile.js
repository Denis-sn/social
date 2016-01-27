/**
 * Created by den on 25.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'text!templates/profile.html'],
    function (Backbone, _, ModelUser, templateProfile) {
        var ProfileView = Backbone.View.extend({
            el: '#mainFrame',
            template: _.template(templateProfile),
            events: {
                'click #location': 'getLocation'
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

            getLocation: function () {
                var output = this.$el.find('#outLocation');

                if (!navigator.geolocation) {
                    output.append("<p>Geolocation is not supported by your browser</p>");
                    return;
                }

                function success(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    output.append('<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>');

                    var img = new Image();
                    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

                    output.append(img);
                }

                function error() {
                    output.append("Unable to retrieve your location");
                }

                output.append("<p>Locating…</p>");

                navigator.geolocation.getCurrentPosition(success, error);
            },

            render: function () {
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ProfileView;
    });