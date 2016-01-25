/**
 * Created by den on 24.01.16.
 */
define(['Backbone'], function(Backbone){
    var ModelPost = Backbone.Model.extend({
        urlRoot: '/post'
    });

    return ModelPost;
});