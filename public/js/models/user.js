/**
 * Created by den on 24.01.16.
 */
define(['Backbone'], function (Backbone) {
    var UserModel = Backbone.Model.extend({
        urlRoot: '/user'

    });

    return UserModel;
});