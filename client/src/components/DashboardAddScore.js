import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";

import { fetchCourses } from "../actions/coursesActions";

const mapStateToProps = state => {
	return {
		courses: state.courses.data
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCourses: () => dispatch(fetchCourses())
	};
};

class DashboardAddScore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			courseOptions: [],
			teeOptions: [],
			selectedCourseId: null,
			selectedTeeId: null,
			selectedTee: null,
			selectedCourse: null,
			gross: "",
			adjustedGross: "",
			courseHandicap: "",
			net: "",
			differential: ""
		};
	}

	handleCourseChange = option => {
		if (option) {
			//Isolate the selected course from redux course list by matching the courseId
			const courseArray = this.props.courses.filter(course => {
				return course.id === option.value;
			});
			//Pull course from array into a new object
			const course = Object.assign({}, courseArray[0]);
			//Map Tees options
			const teeOptions = course.tees.map(tee => {
				return Object.assign(
					{},
					{
						value: tee.id,
						label: `${tee.name} - ${tee.yardage} yds, rating: ${
							tee.rating
						}, slope: ${tee.slope}`
					}
				);
			});
			//Save to local state for React-Select Component
			this.setState({
				selectedCourse: option,
				selectedCourseId: option.value,
				selectedTee: teeOptions[0],
				selectedTeeId: teeOptions[0].value,
				teeOptions: teeOptions
			});
		} else {
			//If select form is cleared set id values and options to null
			this.setState({
				selectedCourse: null,
				selectedCourseId: null,
				selectedTee: null,
				selectedTeeId: null,
				teeOptions: []
			});
		}
	};

	handleTeeChange = option => {
		this.setState({ selectedTee: option, selectedTeeId: option.value });
	};

	handleGrossChange = e => {
		this.setState({ gross: e.target.value });
	};

	handleAdjustedGrossChange = e => {
		this.setState({ adjustedGross: e.target.value });
	};

	handleCourseHandicapChange = e => {
		this.setState({ courseHandicap: e.target.value });
	};

	componentDidMount() {
		//Fetch Courses via API and store in Redux when component mounts
		this.props.fetchCourses();
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
		return (
			<div className="col mx-auto">
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
							onChange={this.handleCourseChange}
						/>
					</div>
					{this.state.selectedCourseId && (
						<div className="form-group">
							<label htmlFor="teeSelect">Tees</label>
							<Select
								id="teeSelect"
								value={this.state.selectedTee}
								options={this.state.teeOptions}
								onChange={this.handleTeeChange}
							/>
						</div>
					)}
					{this.state.selectedTeeId && (
						<React.Fragment>
							<div className="form-group row">
								<label
									className="col-sm-3 col-form-label"
									htmlFor="gross"
								>
									Gross
								</label>
								<div className="col-sm-3">
									<input
										className="form-control"
										id="gross"
										value={this.state.gross}
										onChange={this.handleGrossChange}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									className="col-sm-3 col-form-label"
									htmlFor="adjustedGross"
								>
									Adjusted Gross (if known)
								</label>
								<div className="col-sm-3">
									<input
										className="form-control"
										id="adjustedGross"
										value={this.state.adjustedGross}
										onChange={
											this.handleAdjustedGrossChange
										}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									className="col-sm-3 col-form-label"
									htmlFor="courseHandicap"
								>
									Course Handicap
								</label>
								<div className="col-sm-3">
									<input
										className="form-control"
										id="courseHandicap"
										value={this.state.courseHandicap}
										onChange={
											this.handleCourseHandicapChange
										}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									className="col-sm-3 col-form-label"
									htmlFor="net"
								>
									Net
								</label>
								<div className="col-sm-3">
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
									className="col-sm-3 col-form-label"
									htmlFor="differential"
								>
									Differential
								</label>
								<div className="col-sm-3">
									<input
										className="form-control"
										id="differential"
										value={this.state.differential}
										readOnly
									/>
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
