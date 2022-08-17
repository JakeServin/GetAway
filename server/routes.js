const express = require("express");
const userModel = require('./models/user')
const vacationModel = require('./models/vacation')
const taskModel = require('./models/task')
const app = express();

// User routes
app.post("/add_user", async (request, response) => {
	const user = new userModel(request.body);

	try {
		await user.save();
		response.send(user);
	} catch (error) {
		response.status(500).send(error);
	}
});
app.get("/users", async (request, response) => {
	const users = await userModel.find({});

	try {
		response.send(users);
	} catch (error) {
		response.status(500).send(error);
	}
});

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