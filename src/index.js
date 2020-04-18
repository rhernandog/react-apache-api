import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

import MyComponent from "./components/myComponent";

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			searchParams: ""
		};

		this.buttonClickHandler = this.buttonClickHandler.bind(this);
		this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
		this.searchParamsChange = this.searchParamsChange.bind(this);
	}
	buttonClickHandler(id) {
		console.log(id);
		let _id = typeof (id) == "string" ? id : false;
		axios.get(_id ? `/api/users.php?id=${_id}` : "/api/users.php")
			.then(response => {
				console.log(response.data);
				if (!_id) {
					this.setState({
						users: response.data
					});
				}
			})
			.catch(err => {
				console.log(err);
			})
	};

	searchSubmitHandler(e) {
		e.preventDefault();
		const { searchParams } = this.state;
		axios.get(`/api/users.php?first_name=${searchParams}&last_name=${searchParams}`)
			.then(response => {
				console.log(response.data);
				this.setState({
					users: response.data
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	searchParamsChange(e) {
		this.setState({
			searchParams: e.target.value
		});
	}

	render() {
		const {
			users,
			searchParams
		} = this.state;
		return <div className="container">
			<div className="row">
				<div className="col-12">
					<h1 className="text-center">React Using an Apache Server API</h1>
					<p className="lead">Simple example of using React with an Apache server API, using proxy to direct the requests from webpack dev server to the apache server.</p>
					<hr />
					<button className="btn btn-info" onClick={this.buttonClickHandler}>Get Users</button>
					<hr />
				</div>
				<div className="col-12">
					<h3>Users</h3>
					<p className="lead"></p>
					<form onSubmit={this.searchSubmitHandler}>
						<label htmlFor="searchParams">Find users by first or last name.</label>
						<input
							type="text" name="searchParams"
							id="searchParams"
							className="form-control"
							placeholder="Search terms"
							value={searchParams}
							onChange={this.searchParamsChange}
						/>
						<button className="btn btn-secondary mt-3" type="submit">Search</button>
					</form>
				</div>
				{
					users.map(user => {
						return <div className="col-12 col-sm-6 col-md-4 mb-3" key={user.user_id}>
							<div className="card">
								<div className="card-body">
									<div className="h3 card-title">{user.user_name}</div>
									<button
										className="btn btn-primary"
										onClick={() => this.buttonClickHandler(user.user_id)}
									>User Info</button>
								</div>
							</div>
						</div>
					})
				}
			</div>
		</div>;
	}
}

render(
	<App />, document.getElementById("root")
);
