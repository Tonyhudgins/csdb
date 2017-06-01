import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from '../components/Option.jsx';
import * as actions from '../actions/creators/cohortContainerActions';

const mapStateToProps = store => ({
  programs:       store.cohortState.programs,
  programsById:   store.cohortState.programsById,
  currentProgram: store.cohortState.currentProgram,
});

const mapDispatchToProps = dispatch => ({
  getProgramList: (currentCampus) => { dispatch(actions.fetchProgramListThunk(currentCampus)); },

  handleProgramChange: (event) => {
    //console.log('ProgramSelect handleProgramChange - programId:', event.target.value);
    dispatch(actions.setCurrentProgramFetchCohorts(event.target.value));
  },
});

const ProgramSelect = (props) => {
  // create an option list out of our available programs
  let programOptions = [];
  if (props.programs.length) {
    programOptions = props.programs.map((programId, i) => (
      <Option key={i} id={'programOpt' + i} value={programId}
              name={props.programsById[programId].program_name}/>
    ));
  }

  //console.log('ProgramSelect: rendering ProgramSelect', props.programs.length, programOptions);
  return (
    <div className="cs-selection">
      <select id="programSelect" className="cs-select"
              onChange={props.handleProgramChange}>
        {programOptions}
      </select>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgramSelect);
