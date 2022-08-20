const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	dayIndex: {
		type: Number,
		required: true,
	},
	tripId: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

const taskModel = mongoose.model("Task", TaskSchema);

module.exports = taskModel;
