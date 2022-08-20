import React from 'react'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VacationDetails from "./routes/VacationDetails";
import HomePage from "./routes/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewVacation from "./routes/NewVacation";
import SignIn from "./routes/SignIn";
import Register from "./routes/Register";
import { connect } from 'react-redux';
import MyTrips from './routes/MyTrips';

const App = (props) => {
    const {isLoggedIn} = props
  return (
		<BrowserRouter className="window">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="newvacation" element={!isLoggedIn ? <SignIn/> : <NewVacation />} />
				<Route path="vacations/" element={<VacationDetails />} />
				<Route path="signin" element={!isLoggedIn ? <SignIn /> : <HomePage/>} />
				<Route path="trips" element={<MyTrips />} />
				<Route path="register" element={!isLoggedIn ? <Register /> : <HomePage/>} />
			</Routes>
			<Footer />
		</BrowserRouter>
  );
}

const mapStateToProps = (state) => {
    console.log(state)
	const isLoggedIn = state.loginReducer;
	return {
		isLoggedIn,
	};
};


export default connect(mapStateToProps, null)(App);
