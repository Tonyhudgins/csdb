import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import changeSelectedTab from '../../actions/creators/tabActions';
import CampusTab from './CampusTab.jsx';
import AddEditStudentTabs from './AddEditStudentTabs.jsx';

const mapStateToProps = store => ({
  tabs1: store.addEditState.tabs1,
  tabs2: store.addEditState.tabs2,
});

const mapDispatchToProps = dispatch => ({
  changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },
});

const addEditContainer = (props) => (
  <div id="addEditContainer" className="container">
    <Tabs
        name="tabs1"
        className="tabs tabs-1"
        handleSelect={props.changeSelectedTab}
        selectedTab={props.tabs1}
        >

      <div className="tab-links">
        <TabLink to="tabStudent" default>Student</TabLink>
        <TabLink to="tabCohort">Cohort</TabLink>
        <TabLink to="tabProgram">Program</TabLink>
        <TabLink to="tabCampus">Campus</TabLink>
        <TabLink to="tabTeamMember">Team Member</TabLink>
      </div>

      <div className="content">
        <TabContent for="tabStudent">
          <AddEditStudentTabs/>
        </TabContent>
        <TabContent for="tabCohort">
          <h1>Cohort</h1>
          <label htmlFor="cohortFile">Upload CSV</label>
          <input type="file" id="cohortFile" name="cohortFile"
                 accept=".csv" onChange={props.uploadCohortFile} />
        </TabContent>
        <TabContent for="tabProgram">
          <h1>Program</h1>
        </TabContent>
        <TabContent for="tabCampus">
          <CampusTab/>
        </TabContent>
        <TabContent for="tabTeamMember">
          <h1>Team Member</h1>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(addEditContainer);
