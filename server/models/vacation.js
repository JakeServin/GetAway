const mongoose = require("mongoose");

const VacationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		required: true,
	},
	startDate: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
});

const vacationModel = mongoose.model("Vacation", VacationSchema);

module.exports = vacationModel;
