const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		required: true,
	},
});

const taskModel = mongoose.model("Task", TaskSchema);

module.exports = taskModel;
