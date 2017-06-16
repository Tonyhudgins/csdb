/**
 * ************************************
 *
 * @module  addNewReducer
 * @author  smozingo
 * @date    04.Jun.2017
 * @description
 *
 * ************************************
 */
import * as types from '../actions/actionTypes';

const initialState = {
  tabs1: null,
  tabs2: null,
};

const addEditReducer = function (state = initialState, action) {
  console.log(`in addEditReducer.  Action: ${action.type}`);
  console.log(`details: ${JSON.stringify(action)}`);
  switch (action.type) {
    case types.CHANGE_SELECTED_TAB:
      return {
        ...state,
        [action.namespace]: action.tab,
      };
    default:
      return state;
  }
};

export default addEditReducer;
