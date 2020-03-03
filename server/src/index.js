const mongoose = require("mongoose");
const express = require("express");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


mongoose.connect("mongodb://localhost:27017/usersdb", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('connected to db'))
	.catch(err => console.log(err));

mongoose.set('debug', true)
mongoose.set('useFindAndModify', false);

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    next();
});

app.use('/employees', require('./routes/api/employees'));

app.use('/user', require('./routes/user'))


app.listen(3001, () => {
	console.log("Server is running on Port: 3001");
});