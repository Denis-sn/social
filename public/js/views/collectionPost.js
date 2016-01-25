/**
 * Created by den on 24.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'models/post', 'views/post', 'collections/posts'],
    function (Backbone, _, ModelUser, ModelPost, PostView,CollectionPosts) {
        var CollectionView = Backbone.View.extend({
            el: '#posts',

            events: {

            },

            initialize: function () {
                var self = this;

                var posts = new CollectionPosts({model: ModelPost});

                posts.fetch({
                    success: function (collection, res, options) {
                        self.collection = collection;
                        self.render();
                    },
                    error: function (model, res, options) {
                        alert('main render error');
                    }
                });
            },


            render: function () {

                this.collection.each(function(post) {
                    var postView = new PostView({model: post});
                    this.$el.append(postView.render().el);
                }, this);

                return this;
            }
        });

        return CollectionView;
    });