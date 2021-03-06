var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var index = require('./routes/index');


//updated code
var dashboard = require('./routes/dashboard');
var editvisitor = require('./routes/editvisitor');
var users_data = require('./routes/users_data');
var visitor_data = require('./routes/visitor_data');

//updated code finish here

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
app.use('/', dashboard);
app.use('/', editvisitor);
app.use('/api/v1/', users_data);
app.use('/api/v1/', visitor_data);


app.listen(3000, function () {
    console.log('Server started on port 3000...');
});