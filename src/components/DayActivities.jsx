import { set } from 'mongoose';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const DayActivities = ({ day, vacationId, tasks }) => {
  const [inputText, setInputText] = useState("");
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
  console.log(tasks);

  const handleSubmit = () => {
    // Set up task object
    const newTask = {
      name: inputText,
      dayIndex: day.dayIndex,
      tripId: vacationId
    }
    // Post task to database
    axios.post('/add_task', newTask)
    // Clear input field
    setInputText('');
  }

  return (
		<div className="my-3 mx-3">
			<p>
				<a
					class="btn btn-primary col-12"
					data-bs-toggle={`collapse`}
					href={`#collapse${day.dayIndex}`}
					role="button"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
					{dayObj.day}, {dayObj.month} {dayObj.date}
				</a>
			</p>
			<div class="collapse multi-collapse" id={`collapse${day.dayIndex}`}>
				<div class="card card-body">
					{tasks.length < 1 ? (
						<span className="text-secondary">
							Nothing planned yet!
						</span>
          ) : (
              tasks.map((task) => (<li>{task.name}</li>))
          )}
				</div>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control form-control-custom"
						placeholder="Enter a new task"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
					/>
					<button
						class="btn btn-outline-secondary"
						type="button"
						onClick={handleSubmit}
					>
						Add Task
					</button>
				</div>
			</div>
		</div>
  );
}

const mapStateToProps = (state) => {
	const vacationId = state._id; 
	return {
	    vacationId
	};
};

export default connect(mapStateToProps)(DayActivities);