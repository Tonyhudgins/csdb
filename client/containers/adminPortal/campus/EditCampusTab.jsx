/**
 * ************************************
 *
 * @module  EditCampusTab
 * @author  smozingo
 * @date    9/9/17
 * @description
 *
 * ************************************
 */
import React from 'react';
import { connect } from 'react-redux';
import CpcContainer from '../../cpc/CpcContainer.jsx';
import CampusForm from './CampusForm.jsx';

const mapStateToProps = store => ({
  campusesById:  store.cpcState.campusesById,
  currentCampus: store.cpcState.currentCampus,
});

const CampusTab = props => {

  // make sure we have a valid campus before we populate the form
  const campus = (props.currentCampus &&
    props.campusesById[props.currentCampus]) ?
    props.campusesById[props.currentCampus] : {};

  console.log('in  EditCampusTab campus is', campus);
  return (
    <div>
      <CpcContainer exclude="ProgramSelect CohortSelect"/>
      <div className="clear"></div>
      <CampusForm campus={campus} legend="Edit Campus" operation="edit"/>
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(CampusTab);
