/**
 * ************************************
 *
 * @module  tabActions
 * @author  smozingo
 * @date    04.Jun.2017
 * @description
 *
 * ************************************
 */
import * as types from '../actionTypes';

const changeSelectedTab = (selectedTab, tabNamespace) => (
  {
    type: types.CHANGE_SELECTED_TAB,
    tab: selectedTab,
    namespace: tabNamespace,
  }
);

export default changeSelectedTab;
