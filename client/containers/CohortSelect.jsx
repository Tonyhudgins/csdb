import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from './../components/Option.jsx';
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

  handleCohortChange: (event) => {
    console.log('CohortSelect handleCohortChange - cohortId:', event.target.value);
    dispatch(actions.setCurrentCohort(event.target.value));
  },

});

class CohortSelect extends Component {
  constructor(props) {
    super(props);
  }

  handleSelectFocus(event) {
    console.log('CohortSelect focus', document.getElementById('cohortSelect'));
  }

  render() {
    // create an option list out of our available cohorts
    if (this.props.cohorts.length) {
      this.cohortOptions = this.props.cohorts.map((cohortId, i) => (
        <Option key={i} id={'cohortOpt' + i} value={cohortId}
                name={this.props.cohortsById[cohortId].cohort_name}/>
      ));
    }

    console.log('CohortSelect rendering CohortSelect', this.props.cohorts.length, this.cohortOptions);
    return (
      <div className="cs-selection">
        <select id="cohortSelect" className="cs-select"
                onChange={this.props.handleCohortChange}
                onFocus={this.handleSelectFocus}>
          {this.cohortOptions}
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CohortSelect);

