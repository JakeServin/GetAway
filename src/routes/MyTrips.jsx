import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Trip from '../components/Trip';

const MyTrips = (props) => {
  const [trips, setTrips] = useState([]);
  const { connectedUser } = props;
  console.log(trips)
  

  useEffect(() => {
    const getTrips = async () => {
      await axios.get(`/get_vacation?id=${connectedUser._id}`).then(res => setTrips(res.data))
    }
    getTrips();
  },[])
  
  return (
    <div className='mytripsWrapper container'>
      <h3 className='p-3'>Your Trips</h3>
      <div className='d-flex flex-column align-items-center'>
        {trips.length > 0 ? (trips.map((trip) => <Trip tripInfo={trip} />)) : <h4>No trips planned yet...</h4>}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
	const connectedUser = state.userReducer;
	const loggedIn = state.loginReducer;
	return {
		connectedUser,
		loggedIn,
	};
};



export default connect(mapStateToProps, null)(MyTrips);