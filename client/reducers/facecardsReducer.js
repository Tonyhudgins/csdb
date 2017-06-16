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
  facecards: [],
};

const facecardsReducer = function (state = initialState, action) {
  console.log(`in facecardsReducer.  Action: ${action.type}`);
  console.log(`details: ${JSON.stringify(action)}`);
  switch (action.type) {
    case types.SET_FACECARDS:
      return Object.assign({}, state, { students: action.payload });
    case types.FETCH_ERROR:
      console.log(`Failed on fetch: ${action.errorText}`);
      return state;
    default:
      return state;
  }
};

export default facecardsReducer;
