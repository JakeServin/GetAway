const express = require("express");
const userModel = require('./models/user')
const vacationModel = require('./models/vacation')
const taskModel = require('./models/task')
const bcrypt = require('bcryptjs');
const passport = require("passport");
const app = express();
const ObjectId = require('mongodb').ObjectId
// User routes
app.post("/login_user", (req, res, next) => {
	passport.authenticate(
		"local",
		(err, user, info) => {
			if (err) throw err;
			if (!user) res.send("Invalid username or password")
			else {
				req.login(user, (err) => {
					if (err) throw err;
					res.send(req.user)
				});
			}
		}
	)(req, res, next);
});

app.post('/register_user', (req, res) => {
	console.log(req.body.username)
	userModel.findOne({ userName: req.body.username }, async (err, doc) => {
		if (err) throw err
		if (doc) res.send("User Already Exists");
		console.log(doc)
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10)
			const newUser = new userModel({
				userName: req.body.username,
				password: hashedPassword
			});
			await newUser.save();
			res.send("User created")
		}
	})
})

app.get("/get_user", async (req, res) => {

	console.log(req.query.id)
	const user = await userModel.findOne({_id: ObjectId(req.query.id)});

	try {
		res.send(user.userName);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.get("/current_user", (req, res) => {
	console.log(req.user)
	res.send(req.user);
});


app.get("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
})

// Vacation routes
app.post("/add_vacation", async (request, response) => {
	const vacation = new vacationModel(request.body);

	try {
		await vacation.save();
		response.send(vacation);
	} catch (error) {
		response.status(500).send(error);
	}
});

app.get("/vacations", async (request, response) => {
	const vacations = await vacationModel.find({});

	try {
		response.send(vacations);
	} catch (error) {
		response.status(500).send(error);
	}
});

// Task routes
app.post("/add_task", async (request, response) => {
	const task = new taskModel(request.body);

	try {
		await task.save();
		response.send(task);
	} catch (error) {
		response.status(500).send(error);
	}
});

app.get("/tasks", async (request, response) => {
	if (!request.query.id) return
	const tasks = await taskModel.find({ tripId: `${request.query.id}` });

	try {
		response.send(tasks);
	} catch (error) {
		response.status(500).send(error);
	}
});
app.get("/delete_task", async (request, response) => {
	const tasks = await taskModel.remove({_id: `${request.query.id}`})

	try {
		response.send(tasks);
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = app;