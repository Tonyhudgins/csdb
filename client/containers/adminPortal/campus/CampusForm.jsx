/**
 * ************************************
 *
 * @module  CampusForm
 * @author  smozingo
 * @date    9/9/17
 * @description
 *
 * ************************************
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as cpcActions from '../../../actions/creators/cpcContainerActions';
import InputTextField from "../../../components/InputTextField.jsx";
import USStates from '../../../components/OptionsUSStates.jsx';

const mapStateToProps = store => ({
  currentCampus: store.cpcState.currentCampus,
  campusesById:  store.cpcState.campusesById,
});

const mapDispatchToProps = (dispatch, ownProps) => ({

  init: (operation, campus) => {
    // if (operation === 'add') {
    //   dispatch(cpcActions.updateNewCampus('campus_id', campus));
    // }
    //
    // dispatch(cpcActions.fetchCampusListThunk('dropdown', operation));
  },

  handleChange: (operation, event) => {
    console.log(`CampusForm in handleChange ${event.target.name} = ${event.target.value}`);
    if (operation === 'edit')
      dispatch(cpcActions.updateCurrentCampus(event.target.name, event.target.value));
    else
      dispatch(cpcActions.updateNewCampus(event.target.name, event.target.value));
  },

  handleSubmit: (campus, operation, event) => {
    event.preventDefault();
    console.log('CampusForm Submit', operation, campus.campus_name);
    if (operation === 'edit')
      dispatch(cpcActions.postCurrentCampusThunk(campus));
    else
      dispatch(cpcActions.postNewCampusThunk(campus));
  },

  resetForm: () => {
    // set all inputs to empty strings
    console.log('resetting campusForm');
    const inputs = document.querySelectorAll('#campusForm input');
    inputs.forEach((input) => input.value = '');
  }

});

class CampusForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('CampusForm in CWM operation:', this.props.operation);
    this.props.init(this.props.operation, this.props.currentCampus);
  }

  render() {
    const campus = this.props.campus;

    console.log(`CampusForm (${this.props.operation}) in render`, campus);

    return (
      <main>
        <form id="campusForm" className="form-horizontal">
          <fieldset>
            <legend>{this.props.legend}</legend>
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Name</span>
                  <InputTextField id="campusName" name="name" className="form-control"
                                  placeholder="Codesmith LA" type="text" value={campus.name}
                                  onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Address 1</span>
                  <input id="address1" name="street_address_1" className="form-control"
                                  placeholder="123 Tech Ave" type="text" value={campus.street_address_1}
                                  onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="input-group">
                  <span className="input-group-addon">Address 2</span>
                  <InputTextField id="address2" name="street_address_2" className="form-control"
                                  placeholder="Suite 1A" type="text" value={campus.street_address_2}
                                  onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-addon">City</span>
                  <InputTextField id="city" name="city" className="form-control"
                                  placeholder="Los Angeles" type="text" value={campus.city}
                                  onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
              <div className="col-md-2">
                <USStates name="state" selectedState={campus.state}
                          onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
              </div>
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-addon">Zip Code</span>
                  <InputTextField id="zipCode" name="zip_code" className="form-control"
                                  placeholder="90066" type="text" value={campus.zip_code}
                                  onChange={(event) => this.props.handleChange(this.props.operation, event)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <button id="btnCampusUpdateSubmit" className="btn btn-primary"
                        onClick={(event) => this.props.handleSubmit(campus, this.props.operation, event)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
