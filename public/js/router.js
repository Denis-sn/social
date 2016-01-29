/**
 * Created by den on 24.01.16.
 */
define(['Backbone',
    'views/login',
    'views/register',
    'views/postsView',
    'views/usersView',
    'views/profile',
    'views/main'], function (Backbone, LoginView, RegisterView, PostsView, UsersView, ProfileView, MainView) {
    var Router = Backbone.Router.extend({
        routes: {
            'login': 'login',
            'register': 'register',
            'posts': 'posts',
            'profile': 'profile',
            'users': 'users',
            '*any': 'default'
        },

        initialize: function () {
        },

        login: function () {
            var loginView = new LoginView();
        },

        register: function () {
            var registerView = new RegisterView();
        },

        posts: function () {
            App.loggedIn = localStorage.getItem('loggedIn');
            if (App.loggedIn) {
                this.mainView = new MainView(PostsView);
            } else {
                Backbone.history.navigate('#login', {trigger: true});
            }
        },

        users: function () {
            this.mainView = new MainView(UsersView);
        },

        profile: function () {
            this.mainView = new MainView(ProfileView);
        },

        default: function () {
            Backbone.history.navigate('#login', {trigger: true});
        }
    });

    return Router;
});