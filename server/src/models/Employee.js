const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeScheme = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number
	},
	phone: {
		type: Number
	}
});

const Employee = mongoose.model("Employee", employeeScheme);
module.exports = Employee;