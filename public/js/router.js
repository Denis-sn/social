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
                if(this.mainView){
                    this.mainView.undelegateEvents();
                }
                this.mainView = new MainView();
                if(this.postsView){
                    this.postsView.undelegateEvents();
                }
                this.postsView = new PostsView();
            } else {
                Backbone.history.navigate('#login', {trigger: true});
            }
        },

        users: function () {
            if(this.mainView){
                this.mainView.undelegateEvents();
            }
            this.mainView = new MainView();
            if(this.usersView){
                this.usersView.undelegateEvents();
            }
            this.usersView = new UsersView();
        },

        profile: function () {
            if(this.mainView){
                this.mainView.undelegateEvents();
            }
            this.mainView = new MainView();
            if(this.profileView){
                this.profileView.undelegateEvents();
            }
            this.profileView = new ProfileView();
        },

        default: function () {
            Backbone.history.navigate('#login', {trigger: true});
        }
    });

    return Router;
});