var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var dbpath = require('../database/database');
var error_response = require('./errorresponses');
var db = mongojs(dbpath.database, ['users_data']);

//save register data
router.post('/users_data', function (req, res, next) {
    var data = req.body;

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {

            error_response.errorResponses(res, err, data);

        } else {
            db.users_data.save({
                username: data.username,
                email: data.email,
                password: hash,
                role: data.role
            }, function (err, result) {
                if (err) {

                    error_response.errorResponses(res, err, data);

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
        },
        function (err, result) {
            if (err) {

                error_response.errorResponses(res, err, data);

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