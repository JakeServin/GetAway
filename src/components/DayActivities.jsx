import { set } from 'mongoose';
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {AiOutlineDelete} from 'react-icons/ai'

const DayActivities = ({ day, vacationId, tasks, creator }) => {
  const [inputText, setInputText] = useState("");
  const [myTasks, setMyTasks] = useState([]);
  console.log(myTasks)

  // Convert date to date object
  var months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
  ];
  var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
  ];
  const dayObj = {
		date: day.date.getDate(),
		month: months[day.date.getMonth()],
		day: days[day.date.getDay()],
  };

  const handleSubmit = async () => {
    console.log("test")
    if (inputText.length < 1) return
    // Set up task object
    const newTask = {
      name: inputText,
      dayIndex: day.dayIndex,
	    tripId: vacationId,
	    createdBy: creator ? creator : "anon"
    }
    // Post task to database
    const data = await axios.post('/add_task', newTask).then(res => res.data)
	  setMyTasks([...myTasks, data])
    // Clear input field
    setInputText('');
  }

  const handleDelete = (id) => {
    console.log(id)
    axios.get(`/delete_task?id=${id}`)
    setMyTasks(myTasks.filter((task) => task._id != id));
  }

  useEffect(() => {
    setMyTasks(tasks)
  }, [tasks])


  return (
		<div className="my-3 mx-3">
			<p style={{ marginBottom: 0 }}>
				<a
					className="btn btn-primary col-12"
					data-bs-toggle={`collapse`}
					href={`#collapse${day.dayIndex}`}
					role="button"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
					{dayObj.day}, {dayObj.month} {dayObj.date}
				</a>
			</p>
			<div className="collapse multi-collapse" id={`collapse${day.dayIndex}`}>
				<div className="card card-body">
					{myTasks.length < 1 ? (
						<span className="text-secondary">
							Nothing planned yet!
						</span>
					) : (
						myTasks.map((task, i) => (
							<div className="d-flex justify-content-between col-12 my-2 px-2">
								<li className='me-5' key={i}>{task.name}</li>
								<span className="d-flex align-items-center justify-content-end">
									<span className="me-3">
										added by {task.createdBy}
									</span>
									<a
										role="button"
										onClick={() => handleDelete(task._id)}
									>
										<span className='text-danger'>
											<AiOutlineDelete />
										</span>
									</a>
								</span>
							</div>
						))
					)}
				</div>
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control form-control-custom"
						placeholder="Add something exciting!"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
					/>
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={handleSubmit}
					>
						Add
					</button>
				</div>
			</div>
		</div>
  );
}

const mapStateToProps = (state) => {
	const vacationId = state.vacationReducer._id; 
	return {
	    vacationId
	};
};

export default connect(mapStateToProps)(DayActivities);