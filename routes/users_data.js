var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var dbpath = require('../database/database');
var db = mongojs(dbpath.database, ['users_data']);

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

        } else {
            db.users_data.save({
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
                } else {
                    res.json("Response is coming");
                }
            });
        }
    });
});

//checking the login credentials
router.post('/find_data', function (req, res, next) {
    var todo = req.body;

    db.users_data.findOne({
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

        } else if (!result) {

            res.json('User not found');
        } else {
            bcrypt.compare(req.body.password, result.password, function (err, user) {
                if (err) {
                    res.json('User not found');
                } else if (!user) {
                    res.json('User not found');
                } else {
                    res.send(result);
                }
            });
        }
    });

});

module.exports = router;