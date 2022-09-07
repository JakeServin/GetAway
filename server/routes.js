const express = require("express");
const userModel = require('./models/user')
const vacationModel = require('./models/vacation')
const taskModel = require('./models/task')
const bcrypt = require('bcryptjs');
const passport = require("passport");
const app = express();
const ObjectId = require('mongodb').ObjectId


// User routes

// Logs in user
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

//Registers user
app.post('/register_user', (req, res) => {
	userModel.findOne({ userName: req.body.username }, async (err, doc) => {
		if (err) throw err
		if (doc) res.send("User Already Exists");
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

// Get user by ID
app.get("/get_user", async (req, res) => {
	const user = await userModel.findOne({_id: ObjectId(req.query.id)});
	try {
		res.send(user.userName);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Get currently logged in user
app.get("/current_user", (req, res) => {
	res.send(req.user);
});

// Logout currently logged in user
app.get("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
})

// Vacation routes --------------------------------

// Add vacation to database
app.post("/add_vacation", async (request, response) => {
	const vacation = new vacationModel(request.body);

	try {
		await vacation.save();
		response.send(vacation);
	} catch (error) {
		response.status(500).send(error);
	}
});

// Get all vacations
app.get("/vacations", async (request, response) => {
	const vacations = await vacationModel.find({});

	try {
		response.send(vacations);
	} catch (error) {
		response.status(500).send(error);
	}
});

// Get vacatation by user ID
app.get("/get_vacation", async (req, res) => {
	const vacations = await vacationModel.find({ createdBy: req.query.id });

	try {
		res.send(vacations);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Task routes ------------------------------

// Adds task to database
app.post("/add_task", async (request, response) => {
	const task = new taskModel(request.body);

	try {
		await task.save();
		response.send(task);
	} catch (error) {
		response.status(500).send(error);
	}
});

// Get tasks by trip ID
app.get("/tasks", async (request, response) => {
	if (!request.query.id) return
	const tasks = await taskModel.find({ tripId: `${request.query.id}` });

	try {
		response.send(tasks);
	} catch (error) {
		response.status(500).send(error);
	}
});

// Delete a specific task
app.get("/delete_task", async (request, response) => {
	const tasks = await taskModel.remove({_id: `${request.query.id}`})

	try {
		response.send(tasks);
	} catch (error) {
		response.status(500).send(error);
	}
});

module.exports = app;