import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

import { fetchCourses } from "../actions/coursesActions";
import { fetchScores } from "../actions/scoresActions";

import Select from "react-select";
import TeeInfo from "./TeeInfo";

const mapStateToProps = state => {
	return {
		isFetching: state.courses.isFetching,
		courses: state.courses.data,
		token: state.user.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCourses: () => dispatch(fetchCourses()),
		fetchScores: (token, cb) => dispatch(fetchScores(token, cb))
	};
};

class DashboardAddScore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//Object with all course and associated tee data
			courseDetails: null,
			//List of mapped course {value, label} objects for react-select Select component
			courseOptions: [],
			//Object with all tee data for currently selected tee
			teeDetails: null,
			//List of mapped tee {value, label} objects for react-select Select component
			teeOptions: [],
			selectedCourseId: null,
			selectedTeeId: null,
			selectedTee: null,
			selectedCourse: null,
			date: "",
			gross: "",
			adjustedGross: "",
			courseHandicap: "",
			net: "",
			differential: "",
			redirect: false
		};
	}

	handleCourseChange = option => {
		if (option) {
			//Isolate the selected course from redux course list by matching the courseId
			const course = this.props.courses.filter(course => {
				return course.id === option.value;
			})[0];
			//Map Tees options
			const teeOptions = course.tees.map(tee => {
				return Object.assign(
					{},
					{
						value: tee.id,
						label: tee.name
					}
				);
			});
			//Initially select the first set of tees (Ordered by descending rating from sequelize query)
			const teeDetails = course.tees[0];
			//Save to local state for react-select Select and TeeInfo Components
			this.setState(
				{
					courseDetails: course,
					teeDetails: teeDetails,
					selectedCourse: option,
					selectedCourseId: option.value,
					selectedTee: teeOptions[0],
					selectedTeeId: teeOptions[0].value,
					teeOptions: teeOptions
				},
				() => {
					//Recalculate differential if values were already entered
					if (this.state.gross || this.state.adjustedGross) {
						this.calculateDifferential();
					}
				}
			);
		} else {
			//If select form is cleared set state details, id values and options to null
			this.setState({
				courseDetails: null,
				teeDetails: null,
				selectedCourse: null,
				selectedCourseId: null,
				selectedTee: null,
				selectedTeeId: null,
				teeOptions: []
			});
		}
	};

	handleTeeChange = option => {
		//Find tee details from Course details via matching Id and save to local state to display in react-select and TeeInfo components
		const teeDetails = this.state.courseDetails.tees.filter(
			tee => tee.id === option.value
		)[0];
		this.setState(
			{
				selectedTee: option,
				selectedTeeId: option.value,
				teeDetails: teeDetails
			},
			() => {
				//Recalculate differential if values were already entered
				if (this.state.gross || this.state.adjustedGross)
					this.calculateDifferential();
			}
		);
	};

	calculateNet = () => {
		const { gross, courseHandicap } = this.state;
		this.setState({ net: gross - courseHandicap });
	};

	calculateDifferential = () => {
		const { gross, adjustedGross } = this.state;
		const { rating, slope } = this.state.teeDetails;
		if (adjustedGross) {
			const differential = ((adjustedGross - rating) * 113) / slope;
			this.setState({ differential });
		} else {
			const differential = ((gross - rating) * 113) / slope;
			this.setState({ differential });
		}
	};

	handleDateChange = e => {
		console.log(e.target.value);
		this.setState({ date: e.target.value });
	};

	handleInputChange = e => {
		this.setState({ [e.target.id]: parseInt(e.target.value) }, () => {
			this.calculateNet();
			this.calculateDifferential();
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const {
			selectedTeeId,
			date,
			gross,
			adjustedGross,
			courseHandicap,
			differential,
			net
		} = this.state;
		//Axios POST request to /scores/add
		axios
			.post(
				"/scores/add",
				{
					selectedTeeId,
					date,
					gross,
					adjustedGross,
					courseHandicap,
					net,
					differential
				},
				{ headers: { Authorization: `Bearer ${this.props.token}` } }
			)
			.then(response => {
				if (response.data.redirect) {
					//On success update Redux scores and then Redirect to dashboard scores page
					this.props.fetchScores(this.props.token);
					this.setState({ redirect: true });
				}
			})
			.catch(error => console.log(error));
	};

	componentDidMount() {
		//Fetch Courses via API and store in Redux when component mounts
		this.props.fetchCourses();
		//Setting default date to today for datepicker input
		{
			const today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth() + 1; //January is 0!

			const yyyy = today.getFullYear();
			if (dd < 10) {
				dd = "0" + dd;
			}
			if (mm < 10) {
				mm = "0" + mm;
			}
			const defaultDate = `${yyyy}-${mm}-${dd}`;
			this.setState({ date: defaultDate });
		}
	}

	componentDidUpdate(prevProps) {
		//Check when courses prop from Redux updates
		if (this.props.courses !== prevProps.courses) {
			//Map the course data to an options object for React-Select
			const courseOptions = this.props.courses.map(course => {
				return Object.assign(
					{},
					{
						value: course.id,
						label: `${course.name} - ${course.city}, ${
							course.state
						}`
					}
				);
			});
			this.setState({ courseOptions: courseOptions });
		}
	}

	render() {
		if (this.state.redirect) return <Redirect to="/dashboard/scores" />;

		return (
			<div className="container-fluid">
				<h1 className="text-center">Post A Score</h1>
				<form>
					<div className="form-group">
						<label htmlFor="courseNameSearch">
							Search by Course Name
						</label>
						<Select
							id="courseNameSearch"
							autoFocus={true}
							placeholder="Pebble Beach..."
							options={this.state.courseOptions}
							isClearable={true}
							isLoading={this.props.isFetching}
							onChange={this.handleCourseChange}
						/>
					</div>
					{this.state.selectedCourseId && (
						<React.Fragment>
							<div className="form-group">
								<label htmlFor="teeSelect">Tees</label>
								<Select
									id="teeSelect"
									isSearchable={false}
									value={this.state.selectedTee}
									options={this.state.teeOptions}
									onChange={this.handleTeeChange}
								/>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<TeeInfo
										courseName={
											this.state.courseDetails.name
										}
										courseCity={
											this.state.courseDetails.city
										}
										courseState={
											this.state.courseDetails.state
										}
										teeName={this.state.teeDetails.name}
										par={this.state.teeDetails.par}
										yardage={this.state.teeDetails.yardage}
										rating={this.state.teeDetails.rating}
										slope={this.state.teeDetails.slope}
									/>
								</div>
								<div className="col-sm-6">
									<div className="card shadow">
										<div className="card-header">
											Scoring Input
										</div>
										<div className="card-body">
											<div className="form-group row">
												<label
													className="col-sm-6 col-form-label"
													htmlFor="date"
												>
													Date
												</label>
												<div className="col-sm-6">
													<input
														type="date"
														className="form-control"
														id="date"
														defaultValue={
															this.state.date
														}
														onChange={
															this
																.handleDateChange
														}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label
													className="col-sm-6 col-form-label"
													htmlFor="gross"
												>
													Gross
												</label>
												<div className="col-sm-6">
													<input
														className="form-control"
														id="gross"
														type="number"
														value={this.state.gross}
														onChange={
															this
																.handleInputChange
														}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label
													className="col-sm-6 col-form-label"
													htmlFor="adjustedGross"
												>
													Adjusted Gross (if known)
												</label>
												<div className="col-sm-6">
													<input
														className="form-control"
														id="adjustedGross"
														type="number"
														value={
															this.state
																.adjustedGross
														}
														onChange={
															this
																.handleInputChange
														}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label
													className="col-sm-6 col-form-label"
													htmlFor="courseHandicap"
												>
													Course Handicap
												</label>
												<div className="col-sm-6">
													<input
														className="form-control"
														id="courseHandicap"
														type="number"
														value={
															this.state
																.courseHandicap
														}
														onChange={
															this
																.handleInputChange
														}
													/>
												</div>
											</div>
											<div className="form-group row">
												<label
													className="col-sm-6 col-form-label"
													htmlFor="net"
												>
													Net
												</label>
												<div className="col-sm-6">
													<input
														className="form-control"
														id="net"
														value={this.state.net}
														readOnly
													/>
												</div>
											</div>
											<div className="form-group row">
												<label
													className="col-sm-6 col-form-label"
													htmlFor="differential"
												>
													Differential
												</label>
												<div className="col-sm-6">
													<input
														className="form-control"
														id="differential"
														value={
															this.state
																.differential
														}
														readOnly
													/>
												</div>
											</div>
											<button
												type="submit"
												className="btn btn-primary btn-block"
												onClick={this.handleSubmit}
											>
												Submit
											</button>
										</div>
									</div>
								</div>
							</div>
						</React.Fragment>
					)}
				</form>
				<p className="text-center">
					Don't see your course listed? Add one{" "}
					<Link to="/AddCourse">here</Link>
				</p>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardAddScore);
