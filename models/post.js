/**
 * Created by den on 24.01.16.
 */
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    userId :  {type: String, required: true},
    text :  {type: String, required: true}
});

mongoose.model('post', postSchema);