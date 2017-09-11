import React from 'react';
import { connect } from 'react-redux';
import ProgramForm from './ProgramForm.jsx';
import CpcContainer from '../../cpc/CpcContainer.jsx';

const mapStateToProps = store => ({
  newProgram:       store.cpcState.newProgram,
});

const ProgramTab = props => (
  <div>
    <CpcContainer exclude="ProgramSelect CohortSelect"/>
    <ProgramForm program={props.newProgram} legend="Add Program" operation="add"/>
  </div>
);

export default connect(mapStateToProps, () => ({}))(ProgramTab);