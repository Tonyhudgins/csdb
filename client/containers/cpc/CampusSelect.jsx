import React, { Component } from 'react';
import { connect } from 'react-redux';
import Option from '../../components/Option.jsx';
import * as actions from '../../actions/creators/cpcContainerActions';

const mapStateToProps = store => ({
  campuses:       store.cpcState.campuses,
  campusesById:   store.cpcState.campusesById,
  currentCampus:  store.cpcState.currentCampus,
});

const mapDispatchToProps = dispatch => ({
  getCampuses: () => { dispatch(actions.fetchCampusListThunk('fetchAll')); },

  handleCampusChange: (event) => {
    console.log('CampusSelect handleCampusChange - campusId:', event.target.value);
    dispatch(actions.setCurrentCampusFetchPrograms(event.target.value, 'fetchAll'));
  },
});

class CampusSelect extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Grab campus data from csdb
    this.props.getCampuses();
  }

  render() {
    if (this.props.campuses.length) {
      this.campusOptions = this.props.campuses.map((campusId, i) => (
        <Option key={i} id={'campusOpt' + i} value={campusId}
                name={this.props.campusesById[campusId].name}/>
      ));
    }

    return (
      <div className="cs-wrapper">
        <div className="cs-label">campus</div>
        <div className="cs-selection">
          <select id="fetchAllCampusSelect" className="cs-select" value={this.props.currentCampus}
                  onChange={this.props.handleCampusChange}>
            {this.campusOptions}
          </select>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusSelect);
