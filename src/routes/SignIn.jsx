import React from "react";
import { useState } from "react";
import Axios from "axios";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom"
import {connect} from "react-redux";

const SignIn = (props) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let navigate = useNavigate();
  console.log(props);
  const { connectedUser, setUser, setLoggedIn } = props;

	const handleLogin = async () => {
		
	  
    const user = {
      username: loginUsername,
      password: loginPassword
    }
	  const signedIn = await Axios({
			method: "POST",
			data: user,
			// withCredentials: true,
			url: "https://vacationappserver.herokuapp.com/login_user",
		}).then((res) => res.data);
		console.log(typeof (signedIn))
    if (typeof (signedIn) === 'object') {
		setUser(signedIn);
		setLoggedIn();
      	navigate('/')
    } else {
      console.log("DONT REDIRECT")
    }
  }
	

	return (
		<div className="signInWrapper">
			<div className="signInBox col-9 p-4 pb-2">
				<div className="mb-3">
					<h3>Sign In</h3>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						value={loginUsername}
						onChange={(e) => setLoginUsername(e.target.value)}
					/>
					<label htmlFor="floatingInput">Username</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						value={loginPassword}
						onChange={(e) => setLoginPassword(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="mb-3">
					<Link to="#" type="button" className="btn btn-primary col-12" onClick={handleLogin}>
						Sign In
					</Link>
				</div>
				<hr />
				<div className="text-center pt-1">
					<p>
						New user?{" "}
						<Link className="noStyle" to="/register">
							<span className="textThird">Create an account</span>
						</Link>{" "}
						here.
					</p>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	const connectedUser = state.userReducer;
	return {
    connectedUser
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
