import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from '../../components/Option.jsx';
import * as cpcActions from '../../actions/creators/cpcContainerActions';

const mapStateToProps = store => ({
  students:       store.cpcState.students,
  studentsById:   store.cpcState.studentsById,
  currentCohort:  store.cpcState.currentCohort,
});

const mapDispatchToProps = dispatch => ({

  handleStudentChange: (event) => {
    // There has to be a more elegant way to clear the form...
    let studentForm = document.getElementById('studentForm');
    const allFields = studentForm.querySelectorAll('input');
    for (let node in allFields) {
      if (allFields.hasOwnProperty(node) && typeof allFields[node] === 'object')
        allFields[node].value = '';
    }

    console.log(`EditStudentTab handleStudentChange - studentId: ${event.target.value}`);
    dispatch(cpcActions.setCurrentStudent(event.target.value));
  },
});

const StudentSelect = (props) => {
  // create an option list out of our available students
  let studentOptions = [];
  if (props.students && props.students.length) {
    studentOptions = props.students.map((studentId, i) => (
      <Option key={i} id={'studentOpt' + i} value={studentId}
              name={props.studentsById[studentId].first_name + ' ' +
              props.studentsById[studentId].last_name }/>
    ));
  }

  //console.log('StudentSelect: rendering StudentSelect', props.cohorts.length, cohortOptions);
  return (
    <div className="form-group">
      <label className="col-md-4 control-label" htmlFor="studentSelect">Select Student</label>
      <div className="col-md-4">
        <select id="studentSelect" name="student_select" className="form-control"
                onChange={props.handleStudentChange}>
          {studentOptions}
        </select>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentSelect);

