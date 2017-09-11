/**
 * ************************************
 *
 * @module  AdminPortal
 * @author  smozingo
 * @date    28.May.2017
 * @description Hosts tabs for adding/editing campus/program/cohort/student/team data
 *
 * ************************************
 */

import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import changeSelectedTab from '../../actions/creators/tabNavActions';
import AddEditStudentTabs from './student/AddEditStudentTabs.jsx';
import AddEditCohortTabs from './cohort/AddEditCohortTabs.jsx';
import AddEditProgramTabs from './program/AddEditProgramTabs.jsx';
import AddEditCampusTabs from './campus/AddEditCampusTabs.jsx';

const mapStateToProps = store => ({
  adminPortalTabs: store.tabNavState.adminPortalTabs,
});

const mapDispatchToProps = dispatch => ({
  changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },
});

const addEditContainer = (props) => (
  <div id="addEditContainer">
    <Tabs
        name="adminPortalTabs"
        className="tabs tabs-1"
        handleSelect={props.changeSelectedTab}
        selectedTab={props.adminPortalTabs}
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
          <AddEditCohortTabs/>
        </TabContent>
        <TabContent for="tabProgram">
          <AddEditProgramTabs/>
        </TabContent>
        <TabContent for="tabCampus">
          <AddEditCampusTabs/>
        </TabContent>
        <TabContent for="tabTeamMember">
          <h1>Team Member</h1>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(addEditContainer);
