import React, { useEffect } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewVacation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [vacationName, setVacationName] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!vacationName || !destination) {
      console.log("GIELDS EMPTY")
      return;
    }
    
    const newVacation = {
      name: vacationName,
      createdBy: "62f7c3349fd3d3fc00702f29",
      startDate: startDate,
      endDate: endDate,
      location: destination
    };
    const id = await axios.post("/add_vacation", newVacation)
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
							<div class="form-floating mb-3">
								<input
									value={vacationName}
									class="form-control"
									onChange={(e) =>
										setVacationName(e.target.value)
									}
								/>
								<label for="floatingInput">Vacation Name</label>
							</div>
							<div class="form-floating mb-3">
								<input
									value={destination}
									class="form-control"
									onChange={(e) =>
										setDestination(e.target.value)
									}
								/>
								<label for="floatingPassword">
									Destination
                </label>
  
							</div>
							<div className="d-flex justify-content-center align-items-center mb-3">
								<div className="me-2 text-white">Start: </div>
								<ReactDatePicker
									selected={startDate}
									minDate={startDate}
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
							<Link to="vacationdetails">
								<a
									className="btn btn-primary"
									onClick={handleSubmit}
								>
									Let's Go
								</a>
							</Link>
						</form>
					</div>
				</div>
			</div>
		</div>
  );
}

export default NewVacation