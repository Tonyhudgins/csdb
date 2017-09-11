import React from 'react';
import { connect } from 'react-redux';
import CohortForm from './CohortForm.jsx';
import CpcContainer from '../../cpc/CpcContainer.jsx';

const mapStateToProps = store => ({
  newCohort:       store.cpcState.newCohort,
});

const CohortTab = props => (
  <div>
    <CpcContainer exclude="CohortSelect"/>
    <CohortForm cohort={props.newCohort} legend="Add Cohort" operation="add"/>
  </div>
);

export default connect(mapStateToProps, () => ({}))(CohortTab);