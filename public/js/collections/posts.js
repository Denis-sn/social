/**
 * Created by den on 24.01.16.
 */
define(['Backbone'], function (Backbone) {
    var PostsCollection = Backbone.Collection.extend({
        url: '/post'
    });

    return PostsCollection;
});