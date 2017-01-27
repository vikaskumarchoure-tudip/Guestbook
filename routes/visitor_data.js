var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbpath = require('../database/database');
var db = mongojs(dbpath.database, ['visitor_data']);

//get specific data
router.post('/visitor_data_unique', function (req, res, next) {
    var visitors = req.body;
    //if the logged user is admin
    if (req.body.visitor_host == "admin@tudip.com") {
        db.visitor_data.find().sort({
            visitor_host: 1
        }, function (err, data) {
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

                res.json(data);
            }
        });
    } else {
        //data on receptionist login starts here
        db.visitor_data.find({
            visitor_host: visitors.visitor_host
        }).sort({
                visitor_indate: -1,
                visitor_intime: -1
            },
            function (err, data) {
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

                    res.json(data);
                }
            });
        //data on rececptionist login ends here
    }
});

//save visitors
router.post('/visitor_data', function (req, res, next) {

    var visitors = req.body;
    db.visitor_data.save(visitors, function (err, result) {
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
            res.json(result);
        }
    });

});

//update visitors
router.post('/visitor_edit', function (req, res, err) {

    db.visitor_data.update({
        visitor_email: req.body.visitor_email
    }, {
        $set: req.body
    });

});

//delete visitors
router.delete('/visitor_data/:id', function (req, res, next) {

    db.visitor_data.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
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
            res.json(result);
        }
    });


});

module.exports = router;