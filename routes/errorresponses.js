var err_500 = {
    'error': true,
    'message': 'INTERNAL SERVER ERROR'
}

var def_err = {
    'error': true,
    'message': 'Server error occured'
}


module.exports = {
    errorResponses: function (res, err, data) {
        if (err) {
            if (res.status(500)) {
                return res.json(err_500);
            } else {
                return res.json(def_err);
            }
        }
    }
}