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

import ProgramForm from './ProgramForm.jsx';

const mapStateToProps = store => ({
  programsById:   store.cpcState.programsById,
  currentProgram: store.cpcState.currentProgram,
});

const ProgramTab = props => {

  // make sure we have a valid program before we populate the form
  const program = (props.currentProgram &&
  props.programsById[props.currentProgram]) ?
    props.programsById[props.currentProgram] : {};

  return (
    <div>
      <CpcContainer exclude="CohortSelect"/>
      <div className="clear"></div>
      <ProgramForm program={program} legend="Edit Program" operation="edit"/>
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(ProgramTab);
