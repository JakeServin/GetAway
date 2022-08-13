import axios from 'axios';
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';

const VacationDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vacationId = searchParams.get("id");
  let vacations;
  useEffect(() => {
    const getData = async () => {
		const vacationQuery = await axios
			.get("/vacations")
			.then((res) => res.data);
		  vacations = vacationQuery;
      const myVacation = vacations.find((vacation) => vacation._id == vacationId);
      console.log(myVacation);
	  };
	  getData();
  }, [])
  
  return (
    <div>VacationDetails</div>
  )
}

export default VacationDetails