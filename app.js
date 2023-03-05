const express = require('express');
const mongoose = require('mongoose');

mongoose
	.connect(process.env.DATABASE_URI || "mongodb+srv://venkatesh:venkatesh@amplify-test.1eigwf3.mongodb.net/?retryWrites=true&w=majority", {
		useUnifiedTopology: false,
	})
	.then(() => {
		console.log('connected');
	})
	.catch(() => {
		console.log('failed to connect');
	});

const Employee = mongoose.model('Employee', new mongoose.Schema({ name: String, age: Number, phone: String, gender: String }, { timestamps: true }));

const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
	const users = await Employee.find({});
	return res.status(200).json({ message: 'user fetched successfully', users: users, status_code: 200 });
});

app.post('/api/users', async (req, res) => {
	const body = req.body;
	const user = new Employee({ name: body.name, age: body.age, phone: body.phone, gender: body.gender });
	const data = await user.save();
	return res.status(201).json({ message: 'user details saved', user: data, status_code: 201 });
});

app.listen(process.env.PORT || 3000, () => {
	console.log('server is fired');
});
