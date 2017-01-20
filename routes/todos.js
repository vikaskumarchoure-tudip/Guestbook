var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds055565.mlab.com:55565/guestbook', ['guestbook']);

//get all data to display
router.get('/todos', function (req, res, next) {

    db.guestbook.find(function (err, datas) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(datas);
        }
    });

});

//get single data to display
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

/*
router.get('/users_data', function (req, res, next) {

    db.guestbook.find(function (err, datas) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(datas);
        }
    });

});
*/

/*
//save register data
router.post('/users_data', function (req, res, next) {
    var data = req.body;
    if (!data.text || !(data.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.users_data.save(data, function (err, result) {
            if (err) {
                res.send("err");
            }
            else {
                res.json(result);
            }
        });
    }
});
*/

//save data
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.guestbook.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        });
    }
});

//update todo

router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updobj = {};

    if (todo.isCompleted) {
        updobj.isCompleted = todo.isCompleted;
    }

    if (todo.text) {
        updobj.text = todo.text;
    }

    if (!updobj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
    else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updobj, {}, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        });
    }

});

// delete data

router.delete('/todo/:id', function (req, res, next) {

    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    });


});


module.exports = router;