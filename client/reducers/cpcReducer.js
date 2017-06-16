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
import update from 'immutability-helper';

const initialState = {
  campuses: [],
  campusesById: {},
  programs: [],
  programsById: {},
  cohorts: [],
  cohortsById: {},
  currentCampus: 1,
  currentProgram: 1,
  currentCohort: 1,
  currentStudent: 0,
  newStudent: {},
  simpleCampusesList: [],
  simpleCampusesById: {},
  simpleProgramsList: [],
  simpleProgramsById: {},
  simpleCohortList: [],
  simpleCohortsById: {},
};

const cpcReducer = function (state = initialState, action) {
  console.log(`in cpcReducer.  Action: ${action.type}`);
  console.log(`details: ${JSON.stringify(action)}`);
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
    case types.SET_CAMPUS_DROPDOWN_LIST:
      return Object.assign({}, state,
        {
          simpleCampusesList: action.payload.campuses,
          simpleCampusesById: action.payload.campusesById,
        });
    case types.SET_PROGRAM_DROPDOWN_LIST:
      return Object.assign({}, state,
        {
          simpleProgramsList: action.payload.programs,
          simpleProgramsById: action.payload.programsById,
        });
    case types.SET_COHORT_DROPDOWN_LIST:
      return Object.assign({}, state,
        {
          simpleCohortList: action.payload.cohorts,
          simpleCohortsById: action.payload.cohortsById,
        });
    case types.SET_STUDENT_LIST:
      return Object.assign({}, state, {
        students: action.payload.students,
        studentsById: action.payload.studentsById,
      });
    case types.FETCH_ERROR:
      console.error(`Failed on fetch: ${action.source}`);
      console.error(action.err);
      return state;
    case types.SET_CURRENT_CAMPUS:
      return Object.assign({}, state, { currentCampus: action.payload });
    case types.SET_CURRENT_PROGRAM:
      return Object.assign({}, state, { currentProgram: action.payload });
    case types.SET_CURRENT_COHORT:
      return Object.assign({}, state, { currentCohort: action.payload });
    case types.SET_CURRENT_STUDENT:
      return Object.assign({}, state, { currentStudent: action.payload });
    case types.SET_STUDENT_DATA:
      return update(state, {
        studentsById: {
          [state.currentStudent]: {
            [action.field]: { $set: action.payload },
          },
        },
      });
    case types.SET_NEW_STUDENT_DATA:
      return update(state, {
        newStudent: {
          [action.field]: { $set: action.payload },
        },
      });
    default:
      return state;
  }
};

export default cpcReducer;
