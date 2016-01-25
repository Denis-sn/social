/**
 * Created by den on 24.01.16.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var SessionStorage = require('connect-mongo')(session);
var crypto = require('crypto');

var db = mongoose.connection;
mongoose.connect('mongodb://localhost/test');

db.on('error', function(error){
    console.log(error);
});

db.once('connected', function(){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 200}));
    app.use(session({
        name             : 'mySocial',
        key              : "mySocialKey",
        secret           : 'dfhjky4398349erfkdhfg984ytkdfh',
        resave           : false,
        saveUninitialized: false,
        store            : new SessionStorage({
            mongooseConnection: db
        })
    }));

    require('./models/user'); //подтягиваем модельку в мангусе
    var UserModel = mongoose.model('user'); // тут мы эту модельку достаем из мангуса
    require('./models/post'); //подтягиваем модельку в мангусе
    var ModelPost = mongoose.model('post'); // тут мы эту модельку достаем из мангуса

    app.post('/login', function (req, res, next) {
        var body = req.body;
        var shaSum;

        if (body.password && body.email) {
            UserModel.findOne({
                'email': body.email
            }, function (err, user) {
                if (err) {
                    next(err);
                }
                shaSum = crypto.createHash('sha256');
                shaSum.update(body.password);
                body.password = shaSum.digest('hex');

                if (user && user.password === body.password) {
                    req.session.loggedIn = true;
                    req.session.userId = user._id;

                    return res.status(200).send({success: 'LoggedIn'});
                }

                err = new Error();
                err.status = 400;
                next(err);
            });
        }
    });

    app.post('/register', function (req, res, next) {

        var user = new UserModel(req.body);
        var shaSum = crypto.createHash('sha256');

        if(user.password){
            shaSum.update(user.password);
            user.password = shaSum.digest('hex');
        }

        user.save(function (err, _user) {
            if (err) {
                return next(err);
            }

            req.session.loggedIn = true;
            req.session.userId = user._id;

            res.status(200).send({success: true});
        });
    });

    app.post('/logout', function (req, res, next) {
        req.session.destroy();
        res.status(200).send({succes: true});
    });

    app.get('/user', function(req, res, next){

        var userId = req.session.userId;
        UserModel.findOne({_id:userId}).exec(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    });

    app.post('/post', function (req, res, next) {

        var post = new ModelPost(req.body);

        post.save(function (err, post) {
            if (err) {
                return next(err);
            }

            req.session.loggedIn = true;
            req.session.postId = post._id;

            res.status(200).send({success: true});
        });
    });

    app.get('/post', function(req, res, next){

        ModelPost.find().exec(function (err, posts) {
            if (err) {
                return next(err);
            }

            res.status(200).send(posts);
        });
    });

    app.use(express.static(__dirname + '/public'));

    app.listen(3000, function(){
        console.log('Server running');
    });
});

