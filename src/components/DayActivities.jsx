import { set } from 'mongoose';
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {AiOutlineDelete} from 'react-icons/ai'

const DayActivities = ({ day, vacationId, tasks }) => {
  const [inputText, setInputText] = useState("");
  const [myTasks, setMyTasks] = useState([]);

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

  const handleSubmit = () => {
    console.log("test")
    if (inputText.length < 1) return
    // Set up task object
    const newTask = {
      name: inputText,
      dayIndex: day.dayIndex,
      tripId: vacationId
    }
    // Post task to database
    axios.post('/add_task', newTask)
    setMyTasks([...myTasks, newTask])
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
			<p style={{marginBottom: 0}}>
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
					{myTasks.length < 1 ? (
						<span className="text-secondary">
							Nothing planned yet!
						</span>
					) : (
						myTasks.map((task, i) => (
							<div className="d-flex justify-content-between col-12">
								<li key={i}>{task.name}</li>
                <a role="button"
                  onClick={()=> handleDelete(task._id)}
                >
									<AiOutlineDelete
									/>
								</a>
							</div>
						))
					)}
				</div>
				<div class="input-group mb-3">
					<input
						type="text"
						class="form-control form-control-custom"
						placeholder="Add something exciting!"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
					/>
					<button
						class="btn btn-outline-secondary"
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
	const vacationId = state._id; 
	return {
	    vacationId
	};
};

export default connect(mapStateToProps)(DayActivities);