/**
 * ************************************
 *
 * @module  cohortReducer
 * @author  smozingo
 * @date    28.May.2017
 * @description
 *
 * ************************************
 */

import * as types from '../actions/actionTypes';

const initialState = {
  campuses: [],
  campusesById: [],
  programs: [],
  programsById: [],
  cohorts: [],
  cohortsById: [],
  currentCampus: 0,
  currentProgram: 0,
  currentCohort: 0,
};

const cohortReducer = function (state = initialState, action) {
  console.log(`in cohortReducer.  Action: ${action.type}`);
  console.log('cohortReducer details:', Object.keys(action), action.payload);
  switch (action.type) {
    case types.SET_CAMPUS_LIST:
      return Object.assign({}, state,
        {
          campuses: action.payload.campuses,
          campusesById: action.payload.campusesById,
        });
    case types.SET_PROGRAM_LIST:
      return Object.assign({}, state,
        {
          programs: action.payload.programs,
          programsById: action.payload.programsById,
        });
    case types.SET_COHORT_LIST:
      return Object.assign({}, state,
        {
          cohorts: action.payload.cohorts,
          cohortsById: action.payload.cohortsById,
        });
    case types.FETCH_ERROR:
      console.log(`Failed on fetch: ${action.errorText}`);
      return state;
    case types.SET_CURRENT_CAMPUS:
      return Object.assign({}, state, { currentCampus: action.payload });
    case types.SET_CURRENT_PROGRAM:
      return Object.assign({}, state, { currentProgram: action.payload });
    case types.SET_CURRENT_COHORT:
      return Object.assign({}, state, { currentCohort: action.payload });
    default:
      //console.log(`cohortReducer recieved unhandled action ${action.type}`);
      return state;
  }
};

export default cohortReducer;
