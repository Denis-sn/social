/**
 * Created by den on 24.01.16.
 */
define(['Backbone'],function(Backbone){
    var Router = Backbone.Router.extend({
        routes:{
            'login': 'login',
            'register':'register',
            'main':'main',
            'profile': 'profile',
            'users': 'users',
            '*any':'default'
        },

        initialize:function(){
        },

        login: function(){
            require(['views/login'], function(LoginView){
                var loginView = new LoginView();

            });
        },

        register: function(){
            require(['views/register'], function(RegisterView){
                var registerView = new RegisterView();

            });
        },

        main: function(){
            App.loggedIn = localStorage.getItem('loggedIn');
            if(App.loggedIn){
                require(['views/main'], function(MainView){
                    var mainView = new MainView();
                });
            } else {
                Backbone.history.navigate('login',{trigger:true});
            }
        },

        profile: function(){
            require(['views/profile'], function(ProfileView){
                var profileView = new ProfileView();
            });
        },

        users: function(){
            require(['views/collectionUsers'], function(UsersView){
                var usersView = new UsersView();
            });
        },

        default: function(){
            Backbone.history.navigate('#login', {trigger: true});
        }
    });

    return Router;
});