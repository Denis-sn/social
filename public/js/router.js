/**
 * Created by den on 24.01.16.
 */
define(['Backbone'],function(Backbone){
    var Router = Backbone.Router.extend({
        routes:{
            'login': 'login',
            'register':'register',
            'main':'main',
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
                require(['views/main', 'views/collectionPost'], function(MainView, PostsView){
                    var mainView = new MainView();
                    var postView = new PostsView();
                });
            } else {
                Backbone.history.navigate('login',{trigger:true});
            }
        },

        default: function(){
            Backbone.history.navigate('#login', {trigger: true});
        }
    });

    return Router;
});