import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import DayActivities from '../components/DayActivities';

const VacationDetails = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vacationId = searchParams.get("id");
  const { setVacation, vacation } = props;
  const { location, name, startDate, endDate } = vacation;

  const [tasks, setTasks] = useState([]);
  
  // Format trip dates and create an array of days
  let formtStartDate = new Date(startDate);
  let formtEndDate = new Date(endDate);
  const tripLength = Math.abs(formtEndDate - formtStartDate) / (1000 * 3600 * 24) + 1;
  const daysArr = [];
  for (let i = 0; i < tripLength; i++) {
    const dateCopy = new Date(formtStartDate);
    daysArr.push({
      dayIndex: i,
      date: new Date(dateCopy.setDate(dateCopy.getDate() + i)),
    });
  } 
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
    "Saturday"
  ];
  const startDayObj = {
    date: formtStartDate.getDate(),
    month: months[formtStartDate.getMonth()],
    day: days[formtStartDate.getDay()]
  }
  const endDayObj = {
    date: formtEndDate.getDate(),
    month: months[formtEndDate.getMonth()],
    day: days[formtEndDate.getDay()]
  }

  useEffect(() => {
    const getData = async () => {
		  const vacationQuery = await axios
			.get("/vacations")
			.then((res) => res.data);
		  let vacations = vacationQuery;
      const myVacation = vacations.find((vacation) => vacation._id == vacationId);
      setVacation(myVacation)
	  };
    getData();
  },[])
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksQuery = await axios.get(`/tasks?id=${vacation._id}`).then((res) => res.data);
      setTasks(tasksQuery);
    }
    getTasks()
  }, [vacation])

  console.log(tasks)

  return (
		<div className="containe detailsWrapper">
			<div className='p-5'>
				<h1>Let's get ready for {name}!</h1>
				<h3>@ {location}</h3>
				<h4>
					From &nbsp;{startDayObj.day},&nbsp;{startDayObj.month}{" "}
					{startDayObj.date}&nbsp; to &nbsp;{endDayObj.day},{" "}
					{endDayObj.month} {endDayObj.date}
				</h4>
			</div>
			<div>
				<div>
					<h3 className='p-3'>Your Itinerary:</h3>
				</div>
				<div>
					{daysArr.map((day) => {
						return <DayActivities key={day.dayIndex} day={day} tasks={tasks.filter((task) => task.dayIndex == day.dayIndex )} />;
					})}
				</div>
			</div>
		</div>
  );
}

const mapStateToProps = (state) => {
	const vacation = state; 
	return {
	    vacation
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setVacation: (vacation) => {
			dispatch({
				type: "SET_VACATION",
				payload: vacation
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationDetails);