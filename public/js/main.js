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
        moment     : './libs/moment/moment',
        templates  : '../templates'
    },
    shim:{
        Underscore: {
            exports: '_'
        },
        'Backbone': ['Underscore', 'jQuery'],
        'app'     : ['Backbone']
    }
});

require(['app'], function (app) {
    app.init();
});