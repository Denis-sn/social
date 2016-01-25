/**
 * Created by den on 24.01.16.
 */
var App = App || {};
require.config({
    paths:{
        jQuery     : './libs/jquery/dist/jquery',
        Underscore : './libs/underscore/underscore',
        Backbone   : './libs/backbone/backbone',
        text       : './libs/text/text',
        templates  : '../templates'
    },
    shim:{
        Underscore: {
            exports: '_'
        },
        'Backbone': ['Underscore', 'jQuery'],
        'app'     : ['Backbone'],
        'views/collectionPost': ['views/main']
    }
});

require(['app'], function (app) {
    app.init();
});