const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());


const username = "jakeservin";
const password = "Zander2341";
const cluster = "travelapp.eapuasf";
const dbname = "myFirstDatabase";

mongoose.connect(
	`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true
	}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log("Connected successfully");
});

app.use(Router);

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});