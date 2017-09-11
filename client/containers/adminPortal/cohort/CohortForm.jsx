/**
 * ************************************
 *
 * @module  CohortForm
 * @author  smozingo
 * @date    7/15/17
 * @description
 *
 * ************************************
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cpcActions from '../../../actions/creators/cpcContainerActions';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';

const mapStateToProps = store => ({
    currentProgram: store.cpcState.currentProgram,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

  init: (operation) => {
    if (operation === 'add') {
      dispatch(cpcActions.updateNewCohort('program_id', 1));
    }

    dispatch(cpcActions.fetchCampusListThunk('dropdown', operation));
  },

  handleDayChange: (operation, field, date) => {
    console.log(`CohortForm in handleChange ${field} = ${date}`);

    if (operation === 'edit')
      dispatch(cpcActions.updateCurrentCohort(field, date));
    else {
      dispatch(cpcActions.updateNewCohort(field, date));
      // Cohorts generally
      if(field === 'begin_date')
        dispatch(cpcActions.updateNewCohort('end_date', moment(date).add(88, 'days').format('MM/DD/YYYY')))
    }
  },

  handleChange: (operation, event) => {
    console.log(`CohortForm in handleChange ${event.target.name} = ${event.target.value}`);
    if (operation === 'edit')
      dispatch(cpcActions.updateCurrentCohort(event.target.name, event.target.value));
    else
      dispatch(cpcActions.updateNewCohort(event.target.name, event.target.value));
  },

  handleSubmit: (cohort, program, operation, event) => {
    event.preventDefault();
    cohort.program_id = program;
    console.log('CohortForm Submit', operation, cohort.cohort_name);
    if (operation === 'edit')
      dispatch(cpcActions.postCurrentCohortThunk(cohort));
    else
      dispatch(cpcActions.postNewCohortThunk(cohort));
  },

  resetForm: () => {
    // set all inputs to empty strings
    const inputs = document.querySelectorAll('#cohortForm input');
    inputs.forEach((input) => input.value = '');
  }

});

class CohortForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('CohortForm in CWM operation:', this.props.operation);
    this.props.init(this.props.operation);
  }

  render() {
    const cohort = this.props.cohort;

    console.log(`CohortForm (${this.props.operation}) in render`, cohort);
    // if the cohort object is empty, reset the form
    if(Object.keys(cohort).length === 0 && cohort.constructor === Object) this.props.resetForm();

    return (
      <main>
        <form id="cohortForm" className="form-horizontal">
          <fieldset>
            <legend>{this.props.legend}</legend>
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Cohort Name</span>
                  <input id="cohortName" name="cohort_name" className="form-control"
                         placeholder="" type="text" value={cohort.cohort_name}
                         onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-addon">Start Date</span>
                  <DayPickerInput
                    name="start_date"
                    placeholder="MM/DD/YYYY"
                    format="MM/DD/YYYY"
                    value={moment(this.props.cohort.begin_date).format('MM/DD/YYYY')}
                    onDayChange={(date) => this.props.handleDayChange(this.props.operation, 'begin_date', date)}
                    // dayPickerProps={}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-addon">End Date</span>
                  <DayPickerInput
                    name="end_date"
                    placeholder="MM/DD/YYYY"
                    format="MM/DD/YYYY"
                    value={moment(this.props.cohort.end_date).format('MM/DD/YYYY')}
                    onDayChange={(date) => this.props.handleDayChange(this.props.operation, 'end_date', date)}
                    // dayPickerProps={}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <button id="btnCohortUpdateSubmit" className="btn btn-primary"
                        onClick={(event) => this.props.handleSubmit(cohort, this.props.currentProgram, this.props.operation, event)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CohortForm);
