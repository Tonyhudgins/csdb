import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from '../components/Option.jsx';
import * as actions from '../actions/creators/cohortContainerActions';

const mapStateToProps = store => ({
  campuses:       store.cohortState.campuses,
  campusesById:   store.cohortState.campusesById,
  programs:       store.cohortState.programs,
  programsById:   store.cohortState.programsById,
  cohorts:        store.cohortState.cohorts,
  cohortsById:    store.cohortState.cohortsById,
  currentCampus:  store.cohortState.currentCampus,
  currentProgram: store.cohortState.currentProgram,
  currentCohort:  store.cohortState.currentCohort,
});

const mapDispatchToProps = dispatch => ({
  getProgramList: (currentCampus) => { dispatch(actions.fetchProgramListThunk(currentCampus)); },

  handleProgramChange: (event) => {
    console.log('ProgramSelect handleProgramChange - programId:', event.target.value);
    dispatch(actions.setCurrentProgramFetchCohorts(event.target.value));
    //dispatch(actions.fetchCohortListThunk(event.target.value));
  },

});

class ProgramSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Grab program data from csdb
    //this.props.getProgramList(this.props.currentCampus);
    console.log(`ProgramSelect CWM - programs:${this.props.programs.length}`);
    if (this.props.programs.length) {
      this.programOptions = this.props.programs.map((programId, i) => (
        <Option key={i} id={'programOpt' + i} value={programId}
                name={this.props.programsById[programId].program_name}/>
      ));
    }
  }

  handleSelectFocus(event) {
    console.log('ProgramSelect focus', document.getElementById('programSelect'));
  }

  render() {
    // create an option list out of our available programs
    if (this.props.programs.length) {
      this.programOptions = this.props.programs.map((programId, i) => (
        <Option key={i} id={'programOpt' + i} value={programId}
                name={this.props.programsById[programId].program_name}/>
      ));
    }

    console.log('ProgramSelect rendering ProgramSelect', this.props.programs.length, this.programOptions);
    return (
      <div className="cs-selection">
        <select id="programSelect" className="cs-select"
                onChange={this.props.handleProgramChange}
                onFocus={this.handleSelectFocus}>
          {this.programOptions}
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramSelect);
