import axios from 'axios';
import React from 'react'
import { useSearchParams } from 'react-router-dom';

const VacationDetails = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vacationId = searchParams.get("id");
  const getData = async () => {
    const vacationQuery = await axios.get('/vacations').then((res)=> res.data)
    console.log(vacationQuery);
    return 
  }
  const vacations = getData();
  
  return (
    <div>VacationDetails</div>
  )
}

export default VacationDetails