import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from '../../components/Option.jsx';
import * as actions from '../../actions/creators/cpcContainerActions';

const mapStateToProps = store => ({
  programs:       store.cpcState.programs,
  programsById:   store.cpcState.programsById,
  currentProgram: store.cpcState.currentProgram,
});

const mapDispatchToProps = dispatch => ({
  getPrograms: (currentCampus) => { dispatch(actions.fetchProgramListThunk(currentCampus), 'fetchAll'); },

  handleProgramChange: (event) => {
    //console.log('ProgramSelect handleProgramChange - programId:', event.target.value);
    dispatch(actions.setCurrentProgramFetchCohorts(event.target.value, 'fetchAll'));
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
      <select id="fetchAllProgramSelect" className="cs-select" value={props.currentProgram}
              onChange={props.handleProgramChange}>
        {programOptions}
      </select>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgramSelect);
