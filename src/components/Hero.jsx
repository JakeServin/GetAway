import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css"

const Hero = () => {
  return (
		<div className="hero ">
			<h2 className="pb-2">Plan your perfect getaway</h2>
			<div>
				<Link to="/newvacation">
                  <a  className="btn btn-primary">Start Planning</a>
				</Link>
			</div>
		</div>
  );
}

export default Hero