import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from '../components/Option.jsx';
import * as actions from '../actions/creators/cohortContainerActions';

const mapStateToProps = store => ({
  campuses:       store.cohortState.campuses,
  campusesById:   store.cohortState.campusesById,
  currentCampus:  store.cohortState.currentCampus,
});

const mapDispatchToProps = dispatch => ({
  getCampusList: () => { dispatch(actions.fetchCampusListThunk()); },

  handleCampusChange: (event) => {
    //console.log('CampusSelect handleCampusChange - campusId:', event.target.value);
    dispatch(actions.setCurrentCampusFetchPrograms(event.target.value));
  },
});

class CampusSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Grab campus data from csdb
    this.props.getCampusList();
  }

  render() {
    if (this.props.campuses.length) {
      this.campusOptions = this.props.campuses.map((campusId, i) => (
        <Option key={i} id={'campusOpt' + i} value={campusId}
                name={this.props.campusesById[campusId].name}/>
      ));
    }

    return (
      <div className="cs-selection">
        <select id="campusSelect" className="cs-select"
                onChange={this.props.handleCampusChange}>
          {this.campusOptions}
        </select>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusSelect);
