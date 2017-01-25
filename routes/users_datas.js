var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var dbpath = require('../database/database');
var db = mongojs(dbpath.database, ['users_datas']);
//var db = mongojs('mongodb://admin:admin@ds055565.mlab.com:55565/guestbook', ['users_datas']);

router.get('/users_datas', function (req, res, next) {

    db.users_datas.find(function (err, datas) {
        if (err) {
            if (res.status(500)) {
                res.send({
                    'error': true,
                    'message': 'INTERNAL SERVER ERROR'
                });
            } else if (res.status(400)) {
                res.send({
                    'error': true,
                    'message': 'SESSION EXPIRED'
                });
            } else {
                res.send({
                    'error': true,
                    'message': 'Server error occured'
                });
            }
            //res.send(err);
        } else {
            res.json(datas);
        }
    });

});


//save register data
router.post('/users_data', function (req, res, next) {
    var data = req.body;

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            if (res.status(500)) {
                res.send({
                    'error': true,
                    'message': 'INTERNAL SERVER ERROR'
                });
            } else if (res.status(400)) {
                res.send({
                    'error': true,
                    'message': 'SESSION EXPIRED'
                });
            } else {
                res.send({
                    'error': true,
                    'message': 'Server error occured'
                });
            }
            //res.send(err);
        } else {
            //console.log(hash);
        }

        //console.log(data.password);

        db.users_datas.save({
            username: data.username,
            email: data.email,
            password: hash
        }, function (err, result) {
            if (err) {
                if (res.status(500)) {
                    res.send({
                        'error': true,
                        'message': 'INTERNAL SERVER ERROR'
                    });
                } else if (res.status(400)) {
                    res.send({
                        'error': true,
                        'message': 'SESSION EXPIRED'
                    });
                } else {
                    res.send({
                        'error': true,
                        'message': 'Server error occured'
                    });
                }
                //res.send(err);
            } else {
                res.json("Response is coming");
            }
        });
    });
});

//find one data
/*
router.get('/find_data/:id', function (req, res, next) {

    db.users_datas.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    });

});
*/
/*
router.get('/todo/:id', function (req, res, next) {

    db.guestbook.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    });

});
 */

router.post('/find_data', function (req, res, next) {
    var todo = req.body;
    //console.log(req.body.text+" "+req.body.name);

    db.users_datas.findOne({
        email: req.body.email
    }, function (err, result) {
        if (err) {
            if (res.status(500)) {
                res.send({
                    'error': true,
                    'message': 'INTERNAL SERVER ERROR'
                });
            } else if (res.status(400)) {
                res.send({
                    'error': true,
                    'message': 'SESSION EXPIRED'
                });
            } else {
                res.send({
                    'error': true,
                    'message': 'Server error occured'
                });
            }
            //res.send(err);
        } else if (!result) {
            //console.log(result);
            res.json('User not found');
        } else {
            bcrypt.compare(req.body.password, result.password, function (err, user) {
                if (err) {
                    console.log(err)
                } else if (!user) {
                    res.send('wrong password');
                } else {
                    res.send(result);
                    //console.log("success pass is found");
                }
            });
        }
    });



});

/*
router.get('/todo/:id', function (req, res, next) {

    db.guestbook.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(data);
        }
    });

});

 */


module.exports = router;