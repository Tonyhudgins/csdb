import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentForm from './StudentForm.jsx';

const mapStateToProps = store => ({
  newStudent:       store.cpcState.newStudent,
});

const StudentTab = props => (
  <div>
    <StudentForm student={props.newStudent} legend="Add Student" operation="add"/>
  </div>
);

export default connect(mapStateToProps, () => ({}))(StudentTab);

