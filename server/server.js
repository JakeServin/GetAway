const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const Router = require('./routes');
const PORT = 5500;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true
}))

app.use(session({
	secret: "secretcode",
	resave: true.resave,
	saveUninitialized: true
}));

app.use(cookieParser("sercretcode"))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// ----------------------------------------- END OF MIDDLEWARE


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