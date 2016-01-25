/**
 * Created by den on 25.01.16.
 */
define(['Backbone', 'Underscore', 'models/post', 'text!templates/post.html'],
    function (Backbone, _, ModelPost, templatePost) {
        var PostView = Backbone.View.extend({
            el:'#posts',
            template: _.template(templatePost),

            events: {},

            initialize: function () {

            },

            render: function () {
                this.$el.append(this.template(this.model.toJSON()));
                return this;
            }
        });

        return PostView;
    });