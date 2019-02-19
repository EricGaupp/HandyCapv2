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
			selectedTeeId: null
		};
	}

	handleCourseChange = option => {
		if (option) {
			//Isolate the course from redux course list via the courseId
			const courseArray = this.props.courses.filter(course => {
				return course.id === option.value;
			});
			//Pull course from array into a new object
			const course = Object.assign({}, courseArray[0]);
			//Map Tees options
			const teeOptions = course.tees.map(tee => {
				return Object.assign({}, { value: tee.id, label: tee.name });
			});
			//Save to local state for React-Select Component
			this.setState({
				selectedCourseId: option.value,
				selectedTeeId: teeOptions[0].value,
				teeOptions: teeOptions
			});
		} else {
			//If select form is cleared set id values and options to null
			this.setState({
				selectedCourseId: null,
				selectedTeeId: null,
				teeOptions: null
			});
		}
	};

	handleTeeChange = option => {
		this.setState({ selectedTeeId: option.value });
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
								value={this.state.teeOptions[0]}
								options={this.state.teeOptions}
								onChange={this.handleTeeChange}
							/>
						</div>
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
