/**
 * ************************************
 *
 * @module  facecardsReducer
 * @author  smozingo
 * @date    28.May.2017
 * @description
 *
 * ************************************
 */

import * as types from '../actions/actionTypes';

const initialState = {
  students: [],
};

const facecardsReducer = function (state = initialState, action) {
  console.log(`in facecardsReducer.  Action: ${action.type}`);
  switch (action.type) {
    case types.GET_FACECARDS:
      return Object.assign({}, state, { students: action.students });
    case types.FETCH_ERROR:
      console.log(`Failed on fetch: ${action.errorText}`);
      return state;
    default:
      return state;
  }
};

export default facecardsReducer;
