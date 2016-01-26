/**
 * Created by den on 25.01.16.
 */
define(['Backbone'], function (Backbone) {
    var FriendsCollection = Backbone.Collection.extend({
        url: '/users'
    });

    return FriendsCollection;
});