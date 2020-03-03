const express = require("express");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require('../routes/auth');
const User = require('../models/User');

router.post(
	'/signup',
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		console.log(req.body);
		const {
			email,
			password
		} = req.body;
		console.log(email);
		console.log(password);
		try {
			let user = await User.findOne({
				email
			});
			if (user) {
				return res.status(400).json({
					message: "User Already Exists"
				});
			}
			user = new User({
				email,
				password
			});

			console.log(user);
			const salt = await bcrypt.genSalt(10);
			console.log(salt);
			user.password = await bcrypt.hash(password, salt);
			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				"randomString", {
				expiresIn: 10000
			},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token
					});
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Error in Saving");
		}
	}
);

router.post(
	'/login',
	[
		check("email", "Please enter a valid email").isEmail(),
		check("password", "Please enter a valid password").isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({
				email
			});
			if (!user)
				return res.status(400).json({
					message: "User Not Exist"
				});

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({
					message: "Incorrect Password !"
				});

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				"randomString",
				{
					expiresIn: 3600
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token
					});
				}
			);
		} catch (e) {
			console.error(e);
			res.status(500).json({
				message: "Server Error"
			});
		}
	}
);

router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json(user);
	} catch (e) {
		res.send({ message: "Error in Fetching user" });
	}
});


module.exports = router;