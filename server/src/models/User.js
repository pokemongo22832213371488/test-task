const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});


const User = mongoose.model("User", userScheme);
module.exports = User;