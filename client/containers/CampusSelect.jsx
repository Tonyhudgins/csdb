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
  getCampusList: () => { dispatch(actions.fetchCampusListThunk()); },

  handleCampusChange: (event) => {
    console.log('CampusSelect handleCampusChange - campusId:', event.target.value);
    dispatch(actions.setCurrentCampusFetchPrograms(event.target.value));
    //dispatch(actions.fetchProgramListThunk(event.target.value));
  },
});

class CampusSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Grab campus data from csdb
    this.props.getCampusList();
    console.log(`CampusSelect CWM - campuses:${this.props.campuses.length}`);
/*    this.campusOptions = this.props.campuses.map((campusId, i) => (
      <Option key={i} id={'campusOpt' + i} value={campusId}
              name={this.props.campusesById[campusId].name}/>
    ));*/
  }

  componentWillUpdate() {
    console.log(`CampusSelect CWU - campuses:${this.props.campuses.length}`);
    // create an option list out of our available campuses

  }

  handleSelectFocus(event) {
    console.log('CampusSelect focus', document.getElementById('campusSelect'));
  }

  render() {
    if (this.props.campuses.length) {
      this.campusOptions = this.props.campuses.map((campusId, i) => (
        <Option key={i} id={'campusOpt' + i} value={campusId}
                name={this.props.campusesById[campusId].name}/>
      ));
    }

    console.log('CampusSelect rendering CampusSelect', this.props.campuses.length, this.campusOptions);
    return (
      <div className="cs-selection">
        <select id="campusSelect" className="cs-select"
                onChange={this.props.handleCampusChange}
                onFocus={this.handleSelectFocus}>
          {this.campusOptions}
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusSelect);
