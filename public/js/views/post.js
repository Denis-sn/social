/**
 * Created by den on 25.01.16.
 */
define(['Backbone',
    'Underscore',
    'text!templates/post.html'],
    function (Backbone, _, templatePost) {
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
