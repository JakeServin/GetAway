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

const App = (props) => {
    console.log(props)
    const {isLoggedIn} = props
  return (
		<BrowserRouter className="window">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="newvacation" element={!isLoggedIn ? <SignIn/> : <NewVacation />} />
				<Route path="vacations/" element={<VacationDetails />} />
				<Route path="signin" element={<SignIn />} />
				<Route path="register" element={<Register />} />
			</Routes>
			<Footer />
		</BrowserRouter>
  );
}

const mapStateToProps = (state) => {
	const isLoggedIn = state.loginReducer;
	return {
		isLoggedIn,
	};
};


export default connect(mapStateToProps, null)(App);
