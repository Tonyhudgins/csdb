/**
 * ************************************
 *
 * @module  AddEditCampusTabs
 * @author  smozingo
 * @date    9/9/17
 * @description
 *
 * ************************************
 */

import React from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import { connect } from 'react-redux';
import changeSelectedTab from '../../../actions/creators/tabNavActions';
import AddCampusTab from './AddCampusTab.jsx';
import EditCampusTab from './EditCampusTab.jsx';

const mapStateToProps = store => ({
  addEditCampusTabs: store.tabNavState.addEditCampusTabs,
});

const mapDispatchToProps = dispatch => ({
  changeSelectedTab: (selectedTab, tabNamespace) => { dispatch(changeSelectedTab(selectedTab, tabNamespace)); },
});

const addEditCampusTabs = (props) => (
  <div id="addEditCampusContainer">
    <Tabs
      name="addEditCampusTabs"
      className="tabs tabs-1"
      handleSelect={props.changeSelectedTab}
      selectedTab={props.addEditCampusTabs}
    >

      <div className="tab-links">
        <TabLink to="tabEditCampus" default>Edit Campus</TabLink>
        <TabLink to="tabAddCampus">Add Campus</TabLink>
      </div>

      <div className="content">
        <TabContent for="tabEditCampus">
          <EditCampusTab/>
        </TabContent>
        <TabContent for="tabAddCampus">
          <AddCampusTab/>
        </TabContent>
      </div>
    </Tabs>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(addEditCampusTabs);
