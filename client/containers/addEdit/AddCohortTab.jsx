import React, { Component } from 'react';
import { connect } from 'react-redux';
import CpcContainer from '../cpc/CpcContainer.jsx';
import USStates from '../../components/OptionsUSStates.jsx';
import Option from '../../components/Option.jsx';
import * as cpcActions from '../../actions/creators/cpcContainerActions';

const mapStateToProps = store => ({
  campuses:         store.cpcState.campuses,
  campusesById:     store.cpcState.campusesById,
  programs:         store.cpcState.programs,
  programsById:     store.cpcState.programsById,
  currentProgram:   store.cpcState.currentProgram,
  simpleCampusesList: store.cpcState.simpleCampusesList,
  simpleCampusesById: store.cpcState.simpleCampusesById,
  simpleProgramsList: store.cpcState.simpleProgramsList,
  simpleProgramsById: store.cpcState.simpleProgramsById,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

  init: () => {
    dispatch(cpcActions.fetchCampusListThunk('dropdown'));
  },

  handleChange: (event) => {
    console.log(`AddStudentTab in handleChange ${event.target.name} = ${event.target.value}`);
    dispatch(cpcActions.updateNewCohort(event.target.name, event.target.value));
  },

  handleSubmit: (cohort, event) => {
    event.preventDefault();
    console.log('AddCohortTab Submit', cohort.first_name, cohort.last_name);
    dispatch(cpcActions.postCurrentCohortThunk(cohort));
  },

});

class CohortTab extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate() {
    console.log('in CWU');

    // There has to be a more elegant way to clear the form...
    let cohortForm = document.getElementById('cohortForm');
    const allFields = cohortForm.querySelectorAll('input');
    for (let node in allFields) {
      if (allFields.hasOwnProperty(node) && typeof allFields[node] === 'object')
        allFields[node].value = '';
    }
  }

  componentWillMount() {
    console.log('AddCohortTab in CWM currentProgram:', this.props.currentProgram);
    this.props.init();
  }

  render() {
    const cohort = this.props.newCohort;

    console.log('AddCohortTab in render');

    let campusOptions = [];
    if (this.props.simpleCampusesList && this.props.simpleCampusesList.length) {
      campusOptions = this.props.simpleCampusesList.map((campusId, i) => (
        <Option key={i} id={'campusOpt' + i} value={campusId}
                name={this.props.simpleCampusesById[campusId].name }/>
      ));
    }

    let programOptions = [];
    if (this.props.simpleProgramsList && this.props.simpleProgramsList.length) {
      programOptions = this.props.simpleProgramsList.map((programId, i) => (
        <Option key={i} id={'programOpt' + i} value={programId}
                name={this.props.simpleProgramsById[programId].program_name }/>
      ));
    }

    return (
      <form id="cohortForm" className="form-horizontal">
        <fieldset>
          <legend>Add Cohort</legend>
          <div className="form-group">
            <label className="col-md-1 control-label" htmlFor="dropdownCampusSelect">Campus</label>
            <div className="col-md-4">
              <select id="dropdownCampusSelect" className="form-control"
                      onChange={this.props.handleCampusChange}
                      value={cohort.campus_id}>
                {campusOptions}
              </select>
            </div>
            <label className="col-md-1 control-label" htmlFor="dropdownProgramSelect">Program</label>
            <div className="col-md-4">
              <select id="dropdownProgramSelect" className="form-control"
                      onChange={this.props.handleProgramChange}
                      value={cohort.program_id}>
                {programOptions}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-addon">Cohort Name</span>
                <input id="cohortName" name="cohort_name" className="form-control"
                       placeholder="12" type="text" value={cohort.cohort_name}
                       onChange={this.props.handleChange}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Begin Date</span>
                <input id="beginDate" name="begin_date" className="form-control"
                       placeholder="123 Tech Ave" type="text" value={cohort.begin_date}
                       onChange={this.props.handleChange}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Begin Date</span>
                <input id="endDate" name="end_date" className="form-control"
                       placeholder="123 Tech Ave" type="text" value={cohort.end_date}
                       onChange={this.props.handleChange}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <button className="btn btn-primary"
                      onClick={(event) => this.props.handleSubmit(cohort, event)}>
                Submit
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CohortTab);
