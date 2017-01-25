var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var dbpath = require('../database/database');

var db = mongojs(dbpath.database, ['visitor_datas']);

/*
router.get('/visitor_edit',function(req,res,next){
    db.visitor_datas.find(function(err,data){
        if(err){
            res.send("You have error in your code");
        }
        else{
            res.send(data);
        }
    });
});
*/

router.post('/visitor_edit',function(req,res,next){
    console.log("Finally API hits...");
    res.send("Yes it is working...!");
});

module.exports = router;