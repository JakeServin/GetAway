import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './routes/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewVacation from './routes/NewVacation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VacationDetails from './routes/VacationDetails';
import { Provider } from 'react-redux';
import store from './store';
import SignIn from './routes/SignIn';
import Register from './routes/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter className="window">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="newvacation" element={<NewVacation />} />
				<Route path="vacations/" element={<VacationDetails />} />
				<Route path="signin" element={<SignIn/>} />
				<Route path="register" element={<Register />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	</Provider>
);
