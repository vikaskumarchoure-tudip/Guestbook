var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbpath = require('../database/database');
var db = mongojs(dbpath.database, ['visitor_data']);
var error_response = require('./errorresponses');


//get specific data
router.post('/visitor_data_unique', function (req, res, next) {

    var visitors = req.body;
    //if the logged user is admin
    if (req.body.visitor_role == "admin") {
        db.visitor_data.find().sort({
                visitor_host: 1
            },

            function (err, data) {
                if (err) {

                    error_response.errorResponses(res, err, data);
                  
                } else {
                    res.json(data);
                }
            }
        );
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
                    error_response.errorResponses(res, err, data);
              
                } else {

                    res.json(data);
                }
            }

        );
        //data on rececptionist login ends here
    }
});

//save visitors
router.post('/visitor_data', function (req, res, next) {

    var visitors = req.body;
    db.visitor_data.save(visitors,
        function (err, data) {

            if (err) {
                error_response.errorResponses(res, err, data);
               
            } else {
                res.json(data);
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
    }, '', function (err, data) {
        if (err) {
            error_response.errorResponses(res, err, data);

        } else {
            res.json(data);
        }

    });


});

module.exports = router;