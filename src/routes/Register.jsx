import React, { useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	let navigate = useNavigate();

  const handleRegister = async () => {
    const newUser = {
      username: registerUsername,
      password: registerPassword
    }
    Axios({
		method: "POST",
		data: newUser,
		//withCredentials: true,
		url: "https://vacationappserver.herokuapp.com/register_user",
	}).then((res) => console.log(res));
	navigate('/signin')  

  }

  return (
		<div className="signInWrapper">
			<div className="signInBox col-9 p-4 pb-2">
				<div>
					<h3>Register</h3>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						value={registerUsername}
						onChange={(e) => setRegisterUsername(e.target.value)}
					/>
					<label htmlFor="floatingInput">Username</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Password"
						value={registerPassword}
						onChange={(e) => setRegisterPassword(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="mb-3">
					<a
						type="button"
						className="btn btn-primary col-12"
						onClick={handleRegister}
					>
						Create Account
					</a>
				</div>
				<hr />
				<div className="text-center pt-1">
					<p>
						Already a user?{" "}
						<Link to="/signin" className="noStyle">
							<span className="textThird">Sign in </span>
						</Link>
						here.
					</p>
				</div>
			</div>
		</div>
  );
}

export default Register