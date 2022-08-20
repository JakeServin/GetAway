import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const NewVacation = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [vacationName, setVacationName] = useState('');
  const [destination, setDestination] = useState('');
	const navigate = useNavigate();
  const { user } = props
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!vacationName || !destination) {
      return;
    }
    
    const newVacation = {
      name: vacationName,
      createdBy: user._id,
      startDate: startDate,
      endDate: endDate,
      location: destination
    };
    const id = await axios
		.post("http://localhost:5500/add_vacation", newVacation)
		.then(function (response) {
			console.log(response.data);
			return response.data._id;
		})
		.catch(function (error) {
			console.log(error);
		});
	  if (!id) {
			return
		}
		navigate(`/vacations/?id=${id}`)

  }

  return (
		<div className="newVacationWrapper d-flex justify-content-center align-items-center">
			<div className="container ">
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-9 col-sm mb-5 ">
						<h1 className="text-white">
							You're moment's away from planning the perfect{" "}
							<span className="textSecondary">getaway</span>
						</h1>
					</div>
					<div className=" col-9 col-sm ">
						<form>
							<div className="form-floating mb-3">
								<input
									value={vacationName}
									className="form-control"
									placeholder="Trip Name"
									onChange={(e) =>
										setVacationName(e.target.value)
									}
								/>
								<label htmlFor="floatingInput">
									Vacation Name
								</label>
							</div>
							<div className="form-floating mb-3">
								<input
									value={destination}
									className="form-control"
									placeholder="Destination"
									onChange={(e) =>
										setDestination(e.target.value)
									}
								/>
								<label htmlFor="floatingPassword">
									Destination
								</label>
							</div>
							<div className="d-flex justify-content-center align-items-center mb-3">
								<div className="me-2 text-white">Start: </div>
								<ReactDatePicker
									selected={startDate}
									minDate={new Date()}
									onChange={(date) => setStartDate(date)}
								/>
							</div>
							<div className="d-flex justify-content-center align-items-center mb-3">
								<div className="me-3 text-white">End:</div>
								<ReactDatePicker
									selected={endDate}
									minDate={startDate}
									onChange={(date) => setEndDate(date)}
								/>
							</div>
							<Link
								to="vacationdetails"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Let's Go
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
  );
}

const mapStateToProps = (state) => {
	const user = state.userReducer;
	return {
		user,
	};
};


export default connect(mapStateToProps, null)(NewVacation);
