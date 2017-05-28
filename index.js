const express = require('express');
const consolidate = require('consolidate');
const bodyparser = require('body-parser');
const Message = require('./sequelize').Message;
const flash = require('express-flash');
const cookieparser = require('cookie-parser');
const session = require('express-session');


const app = express();

app.set('views', './templates');
app.engine('html', consolidate.nunjucks);

app.use(bodyparser.urlencoded({ extended: true }));
app.use('/static', express.static('./assets'));
app.use(cookieparser('secret-cookie'));
app.use(session({ resave: false, saveUninitialized: false, secret: 'secret-cookie' }));
app.use(flash());

app.get('/', function(req, res) {
	res.render('index.html');
});

app.post('/message', function(req, res) {
	console.log(req.body);
	//res.redirect('/');
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	var number = req.body.number;
	
	Message.create({name:name, email:email, number:number, body:message}).then(function() {
		/* res.redirect('/#contact', {
			success:'Thank you for the message, I will get back with you as soon as I can.'
		});*/
	 	
		res.redirect('/');
	});
});

app.get('/msg', function(req, res) {
	Message.findAll().then(function(results) {
		console.log(results);
		res.render('msg.html', {
			messages:results
		});
	});
});

app.listen(16226, function() {
	console.log('Server is now running at port 16226');
});