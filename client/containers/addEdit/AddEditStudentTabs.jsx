import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import changeSelectedTab from '../../actions/creators/tabActions';
import AddStudentTab from './AddStudentTab.jsx';
import EditStudentTab from './EditStudentTab.jsx';

const mapStateToProps = store => ({
  addEditStudentTabs: store.addEditState.addEditStudentTabs,
});

const mapDispatchToProps = dispatch => ({
  changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },
});

const addEditStudentTabs = (props) => (
  <div id="addEditStudentContainer">
    <Tabs
      name="addEditStudentTabs"
      className="tabs tabs-1"
      handleSelect={props.changeSelectedTab}
      selectedTab={props.addEditStudentTabs}
    >

      <div className="tab-links">
        <TabLink to="tabEditStudent" default>Edit Student</TabLink>
        <TabLink to="tabAddStudent">Add Student</TabLink>
        <TabLink to="tabBulkAddStudents">Bulk Add Students</TabLink>
      </div>

      <div className="content">
        <TabContent for="tabEditStudent">
          <EditStudentTab/>
        </TabContent>
        <TabContent for="tabAddStudent">
          <AddStudentTab/>
        </TabContent>
        <TabContent for="tabBulkAddStudents">
          <h1>Bulk Add Students here</h1>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(addEditStudentTabs);
