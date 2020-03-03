const express = require('express');
const router = new express.Router();
const Employee = require('../../models/Employee');
const auth = require('../../routes/auth');


router.get('/', auth, (req, res) =>{
	Employee.find({}).then( empls =>
		res.send(empls))
	.catch( err  =>  {
		console.log(err);
		res.sendStatus(500).send({ message: err });
	});
});

router.get('/:id', auth,(req,res)=>{
	const id = req.params.id;
	Employee.findOne({_id: id})
	.then( empl =>{
		res.send(empl);
	})
	.catch(err => {
		console.log(err)
		res.sendStatus(500).send({ message: err });
	});
});

router.post('/', auth,(req, res) =>{
	if (!req.body) return res.sendStatus(400);

	const {name, age, phone}= req.body;
	const employee = new Employee({
		name, age, phone
	});
	employee.save()
	.then(()=>res.send(employee))
	.catch(err=> {
		console.log(err);
		res.sendStatus(500).send({ message: err });
	});
});

router.delete('/:id', auth, (req, res) =>{
	const id = req.params.id;
	Employee.findByIdAndDelete({_id: id})
	.then(empl => res.send(empl))
	.catch(err => {
		console.log(err);
		res.sendStatus(500).send({ message: err });
	});
});

router.put('/', auth, (req, res) =>{
	if (!req.body) return res.sendStatus(400);

	const {id, name, age, phone} = req.body;
	const newEmployee = {
		name, age, phone};

		Employee.findOneAndUpdate({_id: id}, newEmployee, {new: true})
		.then(empl => res.send(empl))
		.catch(err => {
			console.log(err)
			res.sendStatus(500).send({ message: err });
	});
});

module.exports = router;