var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbpath = require('../database/database');

var db = mongojs(dbpath.database, ['visitor_datas']);
//var db = mongojs('mongodb://admin:admin@ds055565.mlab.com:55565/guestbook', ['visitor_datas']);

//get visitors
router.get('/visitor_datas', function (req, res, next) {

    db.visitor_datas.find(function (err, datas) {
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

//get specific data
router.post('/visitor_datauq', function (req, res, next) {
    var visitors = req.body;
    //if the logged user is admin
    if(req.body.visitor_host == "admin@gmail.com"){
        db.visitor_datas.find(function (err, datas) {
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
    }
    else{
    //data on receptionist login starts here
    db.visitor_datas.find({
        visitor_host: visitors.visitor_host
    }, function (err, datas) {
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
//data on rececptionist login ends here
}
});

//save visitors
router.post('/visitor_data', function (req, res, next) {
 
    var visitors = req.body;
    db.visitor_datas.save(visitors, function (err, result) {
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
    console.log("You reached here...");
    res.send("Here is the response");
});




//delete visitors
router.delete('/visitor_data/:id', function (req, res, next) {

    db.visitor_datas.remove({
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