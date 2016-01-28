/**
 * Created by den on 25.01.16.
 */
define(['Backbone',
        'Underscore',
        'models/user',
        'text!templates/profile.html',
        'text!templates/editProfile.html'],
    function (Backbone, _, ModelUser, templateProfile, templateEditProfile) {
        var ProfileView = Backbone.View.extend({
            el: '#mainFrame',
            template: _.template(templateProfile),
            events: {
                'click #btnEditProfile': 'editProfile',
                'click #btnSaveProfile': 'saveProfile',
                'click #btnCancelProfile': 'cancelProfile'
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

            saveProfile: function (event) {

                event.preventDefault();
                var self = this;

                var avatar = this.$el.find('#profileAvatar').val();
                var name = this.$el.find('#profileName').val();
                var email = this.$el.find('#profileEmail').val();
                var latitude = this.$el.find('#profileLocation0').val();
                var longitude = this.$el.find('#profileLocation1').val();

                this.model.set({
                    name :  name,
                    avatar: avatar,
                    location: [latitude, longitude],
                    email :  email
                });

                this.model.save(this.model.changed, {
                    patch: true,
                    success: function (model, xhr, options) {
                        self.undelegateEvents();

                        Backbone.history.fragment = '';
                        Backbone.history.navigate('profile', {trigger: true});
                    },
                    error  : function (model, xhr, options) {
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
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ProfileView;
    });