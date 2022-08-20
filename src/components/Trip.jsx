import React from 'react'
import { Link } from 'react-router-dom';

const Trip = ({ tripInfo }) => {
    console.log(tripInfo)
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

	const startDayObj = {
		date: new Date(tripInfo.startDate).getDate(),
		month: months[new Date(tripInfo.startDate).getMonth()],
		day: days[new Date(tripInfo.startDate).getDay()],
	};
	const endDayObj = {
		date: new Date(tripInfo.endDate).getDate(),
		month: months[new Date(tripInfo.endDate).getMonth()],
		day: days[new Date(tripInfo.endDate).getDay()],
	};
  return (
		<Link
			to={`/vacations/?id=${tripInfo._id}`}
			className="tripWrapper m-2 p-3 noStyle col-10 col-sm-6"
		>
			<div>
				<span className="textSecondary">Trip Name:</span>{" "}
				{tripInfo.name}
			</div>
			<div>
				<span className="textSecondary">Destination: </span>{" "}
				{tripInfo.location}
			</div>
			<div>
				<span className="textMain">Start Date:</span> {startDayObj.day},{" "}
				{startDayObj.month} {startDayObj.date}
			</div>
			<div>
				<span className="textMain">End Date:</span> {endDayObj.day},{" "}
				{endDayObj.month} {endDayObj.date}
			</div>
		</Link>
  );
}

export default Trip