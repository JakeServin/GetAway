import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './routes/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewVacation from './routes/NewVacation';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="newvacation" element={<NewVacation />} />
		</Routes>
	</BrowserRouter>
);
