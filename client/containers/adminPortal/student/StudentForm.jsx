/**
 * ************************************
 *
 * @module  StudentForm
 * @author  smozingo
 * @date    28.May.2017
 * @description Provides the Student form for both adding and editing students.
 * The add/edit behavior hinges on the 'operation' prop
 *
 * ************************************
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import USStates from '../../../components/OptionsUSStates.jsx';
import Option from '../../../components/Option.jsx';
import ImageDropzone from '../../../components/ImageDropzone.jsx';
import StudentSelect from '../../cpc/StudentSelect.jsx';
import DeleteStudentModal from './DeleteStudentModal.jsx';
import * as cpcActions from '../../../actions/creators/cpcContainerActions';
import InputTextField from "../../../components/InputTextField.jsx";

const mapStateToProps = store => ({
  newStudent:       store.cpcState.newStudent,
  campuses:         store.cpcState.campuses,
  campusesById:     store.cpcState.campusesById,
  programs:         store.cpcState.programs,
  programsById:     store.cpcState.programsById,
  currentProgram:   store.cpcState.currentProgram,
  simpleCampusesList: store.cpcState.simpleCampusesList,
  simpleCampusesById: store.cpcState.simpleCampusesById,
  simpleProgramsList: store.cpcState.simpleProgramsList,
  simpleProgramsById: store.cpcState.simpleProgramsById,
  simpleCohortList:   store.cpcState.simpleCohortList,
  simpleCohortsById:  store.cpcState.simpleCohortsById,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

  init: (operation) => {
    if (operation === 'add') {
      dispatch(cpcActions.updateNewStudent('state', 'CA'));
      dispatch(cpcActions.updateNewStudent('cohort_id', 1));
    }

    dispatch(cpcActions.fetchCampusListThunk('dropdown', operation));
  },

  handleCampusChange: (operation, event) => {
    console.log(`StudentForm handleCampusChange - campusId: ${event.target.value} op:${operation}`);
    dispatch(cpcActions.fetchProgramListThunk(event.target.value, 'dropdown', operation));
  },

  handleProgramChange: (operation, event) => {
    console.log(`StudentForm handleProgramChange - programId: ${event.target.value}`);
    dispatch(cpcActions.fetchCohortListThunk(event.target.value, 'dropdown', operation));
  },

  handleChange: (operation, event) => {
    console.log(`StudentForm in handleChange ${event.target.name} = ${event.target.value}`);
    if (operation === 'edit')
      dispatch(cpcActions.updateCurrentStudent(event.target.name, event.target.value));
    else
      dispatch(cpcActions.updateNewStudent(event.target.name, event.target.value));
  },

  handleSubmit: (student, operation, event) => {
    event.preventDefault();
    console.log('StudentForm Submit', operation, student.first_name, student.last_name);
    if (operation === 'edit')
      dispatch(cpcActions.postCurrentStudentThunk(student));
    else
      dispatch(cpcActions.postNewStudentThunk(student));
  },

  resetForm: () => {
    // set all inputs to empty strings
    const inputs = document.querySelectorAll('#studentForm input');
    inputs.forEach((input) => input.value = '');
  }

});

class StudentForm extends Component {
  constructor(props) {
    super(props);
    // component level state
    this.state = { modal: false };
  }

  createModal(event) {
    event.preventDefault();
    this.setState({ modal: true });
  }

  resetModal() {
    this.setState({ modal: false });
  }

  componentDidMount() {
    this.props.init(this.props.operation);
    if(this.props.operation === 'edit')
      document.getElementById('btnStudentUpdateSubmit').classList.add('pull-right');
  }

  render() {
    const student = this.props.student;
    const handleChange = this.props.handleChange.bind(this);
    const operation = this.props.operation;

    console.log(`StudentForm (${this.props.operation}) in render`, student);
    // if the student object is empty, reset the form
    if(Object.keys(student).length === 0 && student.constructor === Object) this.props.resetForm();

    // init and populate the campus, program, and cohort dropdowns
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

    let cohortOptions = [];
    if (this.props.simpleCohortList && this.props.simpleCohortList.length) {
      cohortOptions = this.props.simpleCohortList.map((cohortId, i) => (
        <Option key={i} id={'cohortOpt' + i} value={cohortId}
                name={this.props.simpleCohortsById[cohortId].cohort_name }/>
      ));
    }

    // prepare the Edit Student sections
    let studentSelect, btnStudentDelete;
    if (this.props.operation === 'edit') {
      studentSelect =
        <div className="form-group">
          <div className="col-md-4">
            <div className="input-group pull-right">
              <ImageDropzone id="bioImg" name="bio_img" overlay="picUploadOverlay bioPicUploadOverlay"
                            image={student.bio_img ?
                                'images/' + student.cohort_id + '/' + student.bio_img : null }
                            label="Bio Image"/>
            </div>
          </div>
          <StudentSelect resetModal={this.resetModal.bind(this)}/>
          <div className="col-md-4">
            <div className="input-group">
              <ImageDropzone id="codesmithImg" name="codesmith_img" overlay="picUploadOverlay csPicUploadOverlay"
                            image={student.codesmith_img ?
                                'images/' + student.cohort_id + '/' + student.codesmith_img : null }
                            label="Codesmith Image"/>
            </div>
          </div>
        </div>

        btnStudentDelete =
          <div className="col-md-6">
            <button className="btn btn-danger"
               onClick={(event) => this.createModal(event, student)}>
            Delete
            </button>
          </div>
    }

    return (
    <main>
      <form id="studentForm" className="form-horizontal">
        <fieldset>
          <legend>{this.props.legend}</legend>
          {studentSelect}
          <div className="form-group">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-addon">First Name</span>
                <InputTextField id="firstName" name="first_name" className="form-control"
                       placeholder="" value={student.first_name}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-addon">Middle Name</span>
                <InputTextField id="middleName" name="middle_name" className="form-control"
                       placeholder="" value={student.middle_name}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-addon">Last Name</span>
                <InputTextField id="lastName" name="last_name" className="form-control"
                       placeholder="" value={student.last_name}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-1 control-label" htmlFor="dropdownCampusSelect">Campus</label>
            <div className="col-md-3">
              <select id="dropdownCampusSelect" className="form-control"
                      onChange={(event) => this.props.handleCampusChange(operation, event)}
                      value={student.campus_id}>
                {campusOptions}
              </select>
            </div>
            <label className="col-md-1 control-label"
                   htmlFor="dropdownProgramSelect">Program</label>
            <div className="col-md-3">
              <select id="dropdownProgramSelect" className="form-control"
                      onChange={(event) => this.props.handleProgramChange(operation, event)}
                      value={student.program_id}>
                {programOptions}
              </select>
            </div>
            <label className="col-md-1 control-label"
                   htmlFor="dropdownCohortSelect">Cohort</label>
            <div className="col-md-3">
              <select id="dropdownCohortSelect" name="cohort_id"
                      className="form-control"
                      onChange={(event) => handleChange(operation, event)}
                      value={student.cohort_id}>
                {cohortOptions}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-12">
              <div className="input-group">
                <span className="input-group-addon">Address 1</span>
                <InputTextField id="address1" name="street_address_1" className="form-control"
                       placeholder="123 Tech Ave" value={student.street_address_1}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-12">
              <div className="input-group">
                <span className="input-group-addon">Address 2</span>
                <InputTextField
                  id="address2" name="street_address_2" className="form-control"
                  placeholder="Suite 1A" value={student.street_address_2}
                  onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">City</span>
                <InputTextField id="city" name="city" className="form-control"
                       placeholder="Los Angeles" value={student.city}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
            <div className="col-md-2">
              <USStates name="state" selectedState={student.state}
                        onChange1={(event) => handleChange(operation, event)}
                        onChange={(event) => handleChange(operation, event)}/>
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-addon">Zip Code</span>
                <InputTextField id="zipCode" name="zip_code" className="form-control"
                       placeholder="90066" value={student.zip_code}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Primary Phone</span>
                <InputTextField id="primaryPhone" name="primary_phone" className="form-control"
                       placeholder="" type="tel" value={student.primary_phone}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Secondary Phone</span>
                <InputTextField id="secondaryPhone" name="secondary_phone" className="form-control"
                       placeholder="" type="tel" value={student.secondary_phone}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Emergency Contact</span>
                <InputTextField id="emergencyContact" name="emergency_contact" className="form-control"
                       placeholder="" value={student.emergency_contact}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Emergency Phone</span>
                <InputTextField id="emergencyPhone" name="emergency_contact_phone" className="form-control"
                       placeholder="" type="tel" value={student.emergency_contact_phone}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Email</span>
                <InputTextField id="email" name="email" className="form-control"
                       placeholder="" type="email" value={student.email}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-addon">Github Name</span>
                <InputTextField id="githubName" name="github_name" className="form-control"
                       placeholder="" value={student.github_name}
                       onChange={(event) => handleChange(operation, event)}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-6">
              <button id="btnStudentUpdateSubmit" className="btn btn-primary"
                      onClick={(event) => this.props.handleSubmit(student, operation, event)}>
                Submit
              </button>
            </div>
              {btnStudentDelete}
          </div>
        </fieldset>
      </form>
        {/* create the modal if appropriate*/}
        {this.state.modal ? <DeleteStudentModal student={student} resetModal={this.resetModal.bind(this)}/> : <div></div>}
    </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
