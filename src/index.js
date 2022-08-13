import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './routes/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewVacation from './routes/NewVacation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VacationDetails from './routes/VacationDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
        <Navbar/>
        <Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="newvacation" element={<NewVacation />} />
			<Route path="vacations/" element={<VacationDetails />} />

        </Routes>
        <Footer/>
	</BrowserRouter>
);
