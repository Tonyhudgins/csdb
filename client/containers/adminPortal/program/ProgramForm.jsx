/**
 * ************************************
 *
 * @module  ProgramForm
 * @author  smozingo
 * @date    7/15/17
 * @description
 *
 * ************************************
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cpcActions from '../../../actions/creators/cpcContainerActions';
import InputTextField from "../../../components/InputTextField.jsx";

const mapStateToProps = store => ({
  currentCampus: store.cpcState.currentCampus,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

  init: (operation, campus) => {
    if (operation === 'add') {
      dispatch(cpcActions.updateNewProgram('campus_id', campus));
    }

    dispatch(cpcActions.fetchCampusListThunk('dropdown', operation));
  },

  handleDayChange: (operation, field, date) => {
    console.log(`ProgramForm in handleChange ${field} = ${date}`);
    if (operation === 'edit')
      dispatch(cpcActions.updateCurrentProgram(field, date));
    else
      dispatch(cpcActions.updateNewProgram(field, date));
  },

  handleChange: (operation, event) => {
    console.log(`ProgramForm in handleChange ${event.target.name} = ${event.target.value}`);
    if (operation === 'edit')
      dispatch(cpcActions.updateCurrentProgram(event.target.name, event.target.value));
    else
      dispatch(cpcActions.updateNewProgram(event.target.name, event.target.value));
  },

  handleSubmit: (program, campus, operation, event) => {
    event.preventDefault();
    program.campus_id = campus;
    console.log('ProgramForm Submit', operation, program.program_name, 'campus:', program.campus_id);
    if (operation === 'edit')
      dispatch(cpcActions.postCurrentProgramThunk(program));
    else
      dispatch(cpcActions.postNewProgramThunk(program));
  },

  resetForm: () => {
    // set all inputs to empty strings
    const inputs = document.querySelectorAll('#programForm input');
    inputs.forEach((input) => input.value = '');
  }

});

class ProgramForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('ProgramForm in CWM operation:', this.props.operation);
    this.props.init(this.props.operation, this.props.currentCampus);
  }

  render() {
    const program = this.props.program;

    console.log(`ProgramForm (${this.props.operation}) in render`, program);
    // if the program object is empty, reset the form
    if(Object.keys(program).length === 0 && program.constructor === Object) this.props.resetForm();

    return (
      <main>
        <form id="programForm" className="form-horizontal">
          <fieldset>
            <legend>{this.props.legend}</legend>
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Program Name</span>
                  <InputTextField id="programName" name="program_name" className="form-control"
                                  placeholder="" type="text" value={program.program_name}
                                  onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <button id="btnProgramUpdateSubmit" className="btn btn-primary"
                        onClick={(event) => this.props.handleSubmit(program, this.props.currentCampus, this.props.operation, event)}>
                  Submit
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramForm);
