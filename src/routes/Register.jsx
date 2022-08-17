import React, { useState } from 'react'
import  Axios  from 'axios';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleRegister = async () => {
    const newUser = {
      username: registerUsername,
      password: registerPassword
    }
    Axios({
      method: "POST",
      data: newUser,
      withCredentials: true,
      url: "http://localhost:5500/register_user"
    }).then((res)=> console.log(res))

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
					<label for="floatingInput">Username</label>
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
					<label for="floatingPassword">Password</label>
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
						<a href="/signin" className="noStyle">
							<span className="textThird">Sign in </span>
						</a>
						here.
					</p>
				</div>
			</div>
		</div>
  );
}

export default Register