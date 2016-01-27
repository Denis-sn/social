/**
 * Created by den on 24.01.16.
 */
define(['Backbone','router'], function (Backbone, Router) {
    function init() {

        var router = new Router();

        App.router = router || {};
        Backbone.history.start();


    }

    return {
        init: init
    }
});