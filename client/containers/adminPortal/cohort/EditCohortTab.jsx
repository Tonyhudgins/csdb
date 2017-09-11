/**
 * ************************************
 *
 * @module  EditCohortTab
 * @author  smozingo
 * @date    7/15/17
 * @description
 *
 * ************************************
 */
import React from 'react';
import { connect } from 'react-redux';
import CpcContainer from '../../cpc/CpcContainer.jsx';

import CohortForm from './CohortForm.jsx';

const mapStateToProps = store => ({
  cohortsById:   store.cpcState.cohortsById,
  currentCohort: store.cpcState.currentCohort,
});

const CohortTab = props => {

  // make sure we have a valid cohort before we populate the form
  const cohort = (props.currentCohort &&
  props.cohortsById[props.currentCohort]) ?
    props.cohortsById[props.currentCohort] : {};

  return (
    <div>
      <CpcContainer/>
      <div className="clear"></div>
      <CohortForm cohort={cohort} legend="Edit Cohort" operation="edit"/>
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(CohortTab);
