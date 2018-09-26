import React, { Component } from "react";
import RoutineList from "./RoutineList";
import FocusedRoutine from "./FocusedRoutine";
import { connect } from "react-redux";
import { fetchRoutines } from "../../actions";

import "../../less/workouts.css";

class RoutineManager_container extends Component {
  componentDidMount() {
    this.props.fetchRoutines();
  }

  render() {
    console.log("Rendered the container");
    return (
<<<<<<< HEAD
      <div className="RoutineManagerContainer">
        <NavBar />
=======
      <div className="container">
>>>>>>> 8106ea15252aa6a0df34afa2f41821561731ab74
        <div className="WorkoutPlanner">
          <RoutineList />
          {this.props.focusedRoutine ? <FocusedRoutine /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    focusedRoutine: state.RoutineManager.focusedRoutine
  };
};

export default connect(
  mapStateToProps,
  { fetchRoutines }
)(RoutineManager_container);
