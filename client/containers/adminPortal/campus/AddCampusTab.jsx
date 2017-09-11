/**
 * ************************************
 *
 * @module  AddCampusTab
 * @author  smozingo
 * @date    9/9/17
 * @description
 *
 * ************************************
 */
import React from 'react';
import { connect } from 'react-redux';
import CampusForm from './CampusForm.jsx';

const mapStateToProps = store => ({
  newCampus:       store.cpcState.newCampus,
});

const CampusTab = props => (
  <div>
    <CampusForm campus={props.newCampus} legend="Add Campus" operation="add"/>
  </div>
);

export default connect(mapStateToProps, () => ({}))(CampusTab);