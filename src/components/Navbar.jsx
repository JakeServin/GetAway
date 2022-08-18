import React, {useState} from 'react'

const Navbar = () => {
  const [formInput, setFormInput] = useState('');
  console.log(formInput)

  return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-main">
			<div className="container-fluid">
				<a className="navbar-brand" href="/">
					GetAway
				</a>
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
							<a
								className="nav-link"
								aria-current="page"
								href="/"
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/newvacation">
								New Trip
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/signin">
								Sign In/Register
							</a>
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
						<button className="btn bt btn-outline-light" type="submit">
							Search
						</button>
				  </form>
				  
				</div>
			</div>
		</nav>
  );
}

export default Navbar