import React from 'react';
import { connect } from 'react-redux';
import Option from '../../components/Option.jsx';
import * as actions from '../../actions/creators/cpcContainerActions';

const mapStateToProps = store => ({
  cohorts:        store.cpcState.cohorts,
  cohortsById:    store.cpcState.cohortsById,
  currentCohort:  store.cpcState.currentCohort,
});

const mapDispatchToProps = dispatch => ({

  handleCohortChange: (event) => {
    //console.log('CohortSelect handleCohortChange - cohortId:', event.target.value);
    dispatch(actions.setCurrentCohortFetchStudents(event.target.value, 'fetchAll'));
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
    <div className="cs-wrapper">
      <div className="cs-label">cohort</div>
      <div className="cs-selection">
        <select id="fetchAllCohortSelect" className="cs-select" value={props.currentCohort}
                onChange={props.handleCohortChange}>
          {cohortOptions}
        </select>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CohortSelect);

