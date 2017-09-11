import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import changeSelectedTab from '../../../actions/creators/tabNavActions';
import AddCohortTab from './AddCohortTab.jsx';
import EditCohortTab from './EditCohortTab.jsx';

const mapStateToProps = store => ({
  addEditCohortTabs: store.tabNavState.addEditCohortTabs,
});

const mapDispatchToProps = dispatch => ({
  changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },
});

const addEditCohortTabs = (props) => (
  <div id="addEditCohortContainer">
    <Tabs
      name="addEditCohortTabs"
      className="tabs tabs-1"
      handleSelect={props.changeSelectedTab}
      selectedTab={props.addEditCohortTabs}
    >

      <div className="tab-links">
        <TabLink to="tabEditCohort" default>Edit Cohort</TabLink>
        <TabLink to="tabAddCohort">Add Cohort</TabLink>
      </div>

      <div className="content">
        <TabContent for="tabEditCohort">
          <EditCohortTab/>
        </TabContent>
        <TabContent for="tabAddCohort">
          <AddCohortTab/>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(addEditCohortTabs);
