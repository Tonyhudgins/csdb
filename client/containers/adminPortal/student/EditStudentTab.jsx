import React from 'react';
import { connect } from 'react-redux';
import CpcContainer from '../../cpc/CpcContainer.jsx';
import StudentForm from './StudentForm.jsx';

const mapStateToProps = store => ({
  studentsById:   store.cpcState.studentsById,
  currentStudent: store.cpcState.currentStudent,
});

const StudentTab = props => {

  // make sure we have a valid student before we populate the form
  const student = (props.currentStudent &&
  props.studentsById[props.currentStudent]) ?
  props.studentsById[props.currentStudent] : {};

  return (
    <div>
      <CpcContainer/>
      <StudentForm student={student} legend="Edit Student" operation="edit"/>
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(StudentTab);

