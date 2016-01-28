/**
 * Created by den on 26.01.16.
 */
define(['Backbone',
    'Underscore',
    'text!templates/user.html'],
    function (Backbone, _, templateUser) {
        var ViewUser = Backbone.View.extend({
            el:'#user',
            template: _.template(templateUser),

            events: {},

            initialize: function () {

            },

            render: function () {
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
        });

        return ViewUser;
    });