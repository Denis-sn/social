/**
 * Created by den on 24.01.16.
 */
define(['Backbone', 'Underscore', 'models/user', 'models/post', 'views/post', 'collections/posts','text!templates/postsFrame.html'],
    function (Backbone, _, ModelUser, ModelPost, PostView, CollectionPosts, PostsFrame) {
        var CollectionView = Backbone.View.extend({
            el: '#postsFrame',
            template: _.template(PostsFrame),
            events: {
                'click #submitNewPost': 'submitNewPost'
            },

            initialize: function () {

                var self = this;
                self.$el.append(self.template());
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

            submitNewPost: function (event) {
                event.preventDefault();

                var self = this;

                var newPost = this.$el.find('#newPost').val();
                this.$el.find('#newPost').val('');
                var data = {
                    text: newPost
                };

                var post = new ModelPost();
                post.urlRoot = '/post';
                post.save(data, {
                    success: function (res, xhr) {
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
                    error: function () {
                        alert('main post.save error');
                    }
                });
            },

            render: function () {

                this.collection.each(function(post) {
                    var postView = new PostView({model: post});
                    this.$el.find('#posts').append(postView.render().el);
                }, this);

                return this;
            }
        });

        return CollectionView;
    });