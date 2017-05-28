var Sequelize = require('sequelize');

var db = new Sequelize('postgres://gmlunesa:gmlunesa@localhost:5432/gmlunesa');

//model
var Message = db.define('message', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	name: Sequelize.STRING,
	email: Sequelize.STRING,
	number: Sequelize.INTEGER,
	body: Sequelize.STRING
}, {
	timestamps:true
});

db.sync();

module.exports.Message = Message;