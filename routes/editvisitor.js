var express = require('express');
var router = express.Router();

router.get('/editvisitor', function(req, res, next){
    res.render('index.html');
});

module.exports = router;