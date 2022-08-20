import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import DayActivities from "../components/DayActivities";

const VacationDetails = (props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const vacationId = searchParams.get("id");
	const { setVacation, vacation, currentUser } = props;
	const { location, name, startDate, endDate, createdBy,  } = vacation;
	
	const [tasks, setTasks] = useState([]);
	const [creator, setCreator] = useState("");

	// Format trip dates and create an array of days
	let formtStartDate = new Date(startDate);
	let formtEndDate = new Date(endDate);
	const tripLength =
		Math.abs(formtEndDate - formtStartDate) / (1000 * 3600 * 24) + 1;
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
		"Saturday",
	];
	const startDayObj = {
		date: formtStartDate.getDate(),
		month: months[formtStartDate.getMonth()],
		day: days[formtStartDate.getDay()],
	};
	const endDayObj = {
		date: formtEndDate.getDate(),
		month: months[formtEndDate.getMonth()],
		day: days[formtEndDate.getDay()],
	};

	useEffect(() => {
		const getData = async () => {
			const vacationQuery = await axios
				.get("/vacations")
				.then((res) => res.data);
			let vacations = vacationQuery;
			const myVacation = vacations.find(
				(vacation) => vacation._id == vacationId
			);
			setVacation(myVacation);
			
		};
		getData();
	}, []);
	useEffect(() => {
		const getUser = async () => {
			await axios
				.get(`/get_user?id=${createdBy}`)
				.then((res) => setCreator(res.data));
		};
		getUser();
	}, [createdBy]);
	

	useEffect(() => {
		const getTasks = async () => {
			const tasksQuery = await axios
				.get(`/tasks?id=${vacation._id}`)
				.then((res) => res.data);
			setTasks(tasksQuery);
		};
		getTasks();
	}, [vacation]);

	return !vacation.location ? (
		<h1>Trip not found</h1>
	) : (
			
		<div className="container-fluid detailsWrapper">
			<div className="row d-flex align-items-center">
				<div className="p-5 pb-0 pb-sm-5 col-12 col-md-6">
					<h1>
						Let's get ready for{" "}
						<span className="textThird">{name}</span>
					</h1>
					<h3 className="d-flex justify-content-end mb-4">
						@&nbsp;<span className="textMain">{location}</span>
					</h3>
					<h4>
						From &nbsp;{startDayObj.day},&nbsp;{startDayObj.month}{" "}
						{startDayObj.date}&nbsp; to &nbsp;{endDayObj.day},{" "}
						{endDayObj.month} {endDayObj.date}
					</h4>
					<h4>
						Trip Id: <span className="text-info">{vacationId}</span>
					</h4>
					<h4>
							Created by: <span className="text-info">{creator}</span>
					</h4>
				</div>
				<div className="col-12 col-md p-4 mt-3">
					<img
						className="rounded"
						width="100%"
						height="auto"
						src="/images/4k-wallpaper-auto-automobile-2832251-min.webp"
					/>
				</div>
				<div>
					<h3 className="pt-3 px-3">Your Itinerary:</h3>
				</div>
				<div className="pb-3">
					{daysArr.map((day) => {
						return (
							<DayActivities
								key={day.dayIndex}
								day={day}
								tasks={tasks.filter(
									(task) => task.dayIndex == day.dayIndex
								)
								}
								creator={currentUser.userName}
							/>
						);
					})}
				</div>
			</div>
		</div>
		
	);
};

const mapStateToProps = (state) => {
	console.log(state)
	const vacation = state.vacationReducer;
	const currentUser = state.userReducer;
	return {
		vacation,
		currentUser
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setVacation: (vacation) => {
			dispatch({
				type: "SET_VACATION",
				payload: vacation,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VacationDetails);
