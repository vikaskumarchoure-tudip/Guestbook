var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds055565.mlab.com:55565/guestbook', ['users_datas']);

router.get('/users_datas', function (req, res, next) {

    db.users_datas.find(function (err, datas) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(datas);
        }
    });

});


//save register data
router.post('/users_data', function (req, res, next) {
    var data = req.body;
    
        db.users_datas.save(data, function (err, result) {
            if (err) {
                res.send("There is error");
            }
            else {
                res.json("Response is coming");
            }
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
    
        db.users_datas.findOne({email:req.body.email,password:req.body.password}, function (err, result) {
            
            if (err) {
                //console.log(err);
                res.json(err);
            }
            else {
                //console.log(result);
                res.json(result);
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