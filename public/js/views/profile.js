/**
 * Created by den on 25.01.16.
 */
define(['Backbone',
        'Underscore',
        'models/user',
        'text!templates/profile.html',
        'text!templates/editProfile.html',
        'moment'],
    function (Backbone, _, ModelUser, templateProfile, templateEditProfile, moment) {
        var ProfileView = Backbone.View.extend({
            el: '#mainFrame',
            template: _.template(templateProfile),
            events: {
                'click #btnEditProfile': 'editProfile',
                'click #btnSaveProfile': 'saveProfile',
                'click #btnCancelProfile': 'cancelProfile',
                'click #btnGetLocation': 'getLocation'
            },

            initialize: function () {
                this.$el.empty();
                this.template = _.template(templateProfile);
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

            editProfile: function () {
                this.$el.empty();
                this.template = _.template(templateEditProfile);
                this.render();
            },

            getLocation: function (event) {
                var self = this;
                event.preventDefault();

                if (!navigator.geolocation) {
                    alert("Geolocation is not supported by your browser");
                    return;
                }

                function success(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    self.$el.find('#profileLocation0').val(latitude);
                    self.$el.find('#profileLocation1').val(longitude);
                }

                function error() {
                    alert("Unable to retrieve your location");
                }

                navigator.geolocation.getCurrentPosition(success, error);
            },

            saveProfile: function (event) {

                event.preventDefault();
                var self = this;

                var avatar = this.$el.find('#profileAvatar').val();
                var name = this.$el.find('#profileName').val();
                var birthday = this.$el.find('#profileBirthday').val();
                var email = this.$el.find('#profileEmail').val();
                var latitude = this.$el.find('#profileLocation0').val();
                var longitude = this.$el.find('#profileLocation1').val();

                this.model.set({
                    name: name,
                    birthday: birthday,
                    avatar: avatar,
                    location: [latitude, longitude],
                    email: email
                });

                this.model.save(this.model.changed, {
                    patch: true,
                    success: function (model, xhr, options) {
                        self.undelegateEvents();

                        Backbone.history.fragment = '';
                        Backbone.history.navigate('profile', {trigger: true});
                    },
                    error: function (model, xhr, options) {
                        self.$el.append('<span>Error</span>');
                    }
                });

                this.$el.empty();
                this.template = _.template(templateProfile);
                this.render();
            },

            cancelProfile: function () {
                this.$el.empty();
                this.template = _.template(templateProfile);
                this.render();
            },

            render: function () {
                this.model.set({'birthday': moment(this.model.get('birthday')).format('YYYY-MM-DD')});
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ProfileView;
    });