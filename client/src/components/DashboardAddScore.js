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
		this.state = { options: [] };
	}

	handleSelectChange = e => {
		this.setState({ stateSelectValue: e.target.value });
	};

	componentDidMount() {
		this.props.fetchCourses();
	}

	componentDidUpdate(prevProps) {
		if (this.props.courses !== prevProps.courses) {
			const options = this.props.courses.map(course => {
				return Object.assign(
					{},
					{ value: course.id, label: course.name }
				);
			});
			this.setState({ options: options });
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
							placeholder="Pebble Beach..."
							options={this.state.options}
						/>
					</div>
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
