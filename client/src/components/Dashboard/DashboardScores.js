import React from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";

const mapStateToProps = (state) => {
  return {
    scores: state.scores.data,
    isFetching: state.scores.isFetching,
  };
};

const DashboardScores = (props) => {
  //TODO Create Spinner Component to display during any redux isFetching state
  if (props.isFetching) return <h1>Fetching...</h1>;
  return (
    <table className="table table-hover text-center my-0">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Course</th>
          <th scope="col">Tees</th>
          <th scope="col">Gross</th>
          <th scope="col">Adj Gross</th>
          <th scope="col">Course Handicap</th>
          <th scope="col">Net</th>
          <th scope="col">Differential</th>
        </tr>
      </thead>
      <tbody>
        {props.scores.map((score) => {
          const {
            id,
            date,
            courseName,
            teeName,
            gross,
            adjustedGross,
            courseHandicap,
            net,
            differential,
          } = score;
          const formattedDate = dayjs(date).format("MMM D[,] YYYY");
          return (
            <tr
              onClick={() => {
                //Redirect to individual score page
                props.history.push(`${props.match.url}/${id}`);
              }}
              key={id}
            >
              <td>{formattedDate}</td>
              <td>{courseName}</td>
              <td>{teeName}</td>
              <td>{gross}</td>
              <td>{adjustedGross}</td>
              <td>{courseHandicap}</td>
              <td>{net}</td>
              <td>{differential}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default connect(mapStateToProps, null)(DashboardScores);
