var express = require('express');
var consolidate = require('consolidate');
var path = require('path');

var app = express();

app.engine('html', consolidate.nunjucks);

app.set('views', __dirname);

app.use('/', express.static('./'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.listen(3000, function() {
	console.log('Server is now running at port 3000');
});