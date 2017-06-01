import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from './../components/Option.jsx';
import * as actions from '../actions/creators/cohortContainerActions';

const mapStateToProps = store => ({
  cohorts:        store.cohortState.cohorts,
  cohortsById:    store.cohortState.cohortsById,
  currentCohort:  store.cohortState.currentCohort,
});

const mapDispatchToProps = dispatch => ({

  handleCohortChange: (event) => {
    //console.log('CohortSelect handleCohortChange - cohortId:', event.target.value);
    dispatch(actions.setCurrentCohort(event.target.value));
  },
});

const CohortSelect = (props) => {
  // create an option list out of our available cohorts
  let cohortOptions = [];
  if (props.cohorts.length) {
    cohortOptions = props.cohorts.map((cohortId, i) => (
      <Option key={i} id={'cohortOpt' + i} value={cohortId}
              name={props.cohortsById[cohortId].cohort_name}/>
    ));
  }

  //console.log('CohortSelect: rendering CohortSelect', props.cohorts.length, cohortOptions);
  return (
    <div className="cs-selection">
      <select id="cohortSelect" className="cs-select"
              onChange={props.handleCohortChange}>
        {cohortOptions}
      </select>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CohortSelect);

