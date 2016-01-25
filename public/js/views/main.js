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

            },

            initialize: function () {
                var self = this;

                var user = new ModelUser();
                user.fetch({
                    success: function (model, res, options) {
                        self.model = model;
                        self.render();
                        require(['views/collectionPost'], function(CollectionView){
                            var collectionView = new CollectionView();
                        });
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