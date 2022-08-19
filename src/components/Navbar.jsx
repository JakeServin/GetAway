import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Navbar = (props) => {
  const [formInput, setFormInput] = useState('');
  const { connectedUser, setUser, setLoggedIn, setLoggedOut, loggedIn } = props

  // Check req.user to see if user is currently logged in
  useEffect(() => {
    const getUser = async () => {
      await axios.get('/current_user').then(res => {
        setUser(res.data);
        if (!res.data._id) { setLoggedOut() }
        else { setLoggedIn() }
      })

    }
    getUser();
  },[loggedIn])
  
  // Signout if button is pressed;
  const handleSignout = async () => {
    await axios.get("/logout");
    setLoggedOut();

  }

  return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-main">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					GetAway
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className="nav-link"
								aria-current="page"
								to="/"
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/newvacation">
								New Trip
							</Link>
						</li>
						<li className="nav-item">
							{!loggedIn ? (
								<Link className="nav-link" to="/signin">
									Sign In/Register
								</Link>
							) : (
								<Link className="nav-link" to="/" onClick={handleSignout}>
									Sign Out
								</Link>
							)}
						</li>
					</ul>
					<form
						action="/vacations/"
						method="GET"
						className="d-flex ms-auto"
					>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search by Trip ID"
							value={formInput}
							onChange={(e) => setFormInput(e.target.value)}
						/>
						<input type="hidden" name="id" value={`${formInput}`} />
						<button
							className="btn bt btn-outline-light"
							type="submit"
						>
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
  );
}

const mapStateToProps = (state) => {
	const connectedUser = state.userReducer;
	const loggedIn = state.loginReducer;
	return {
    connectedUser,
    loggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (user) => {
			dispatch({
				type: "SET_USER",
				payload: user,
			});
		},
		setLoggedIn: () => {
			dispatch({
				type: "LOG_IN",
			});
		},
		setLoggedOut: () => {
			dispatch({
				type: "LOG_OUT",
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
