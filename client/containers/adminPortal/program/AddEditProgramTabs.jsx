import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import changeSelectedTab from '../../../actions/creators/tabNavActions';
import AddProgramTab from './AddProgramTab.jsx';
import EditProgramTab from './EditProgramTab.jsx';

const mapStateToProps = store => ({
  addEditProgramTabs: store.tabNavState.addEditProgramTabs,
});

const mapDispatchToProps = dispatch => ({
  changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },
});

const addEditProgramTabs = (props) => (
  <div id="addEditProgramContainer">
    <Tabs
      name="addEditProgramTabs"
      className="tabs tabs-1"
      handleSelect={props.changeSelectedTab}
      selectedTab={props.addEditProgramTabs}
    >

      <div className="tab-links">
        <TabLink to="tabEditProgram" default>Edit Program</TabLink>
        <TabLink to="tabAddProgram">Add Program</TabLink>
      </div>

      <div className="content">
        <TabContent for="tabEditProgram">
          <EditProgramTab/>
        </TabContent>
        <TabContent for="tabAddProgram">
          <AddProgramTab/>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(addEditProgramTabs);
