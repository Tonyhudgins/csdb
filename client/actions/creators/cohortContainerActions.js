/**
 * ************************************
 *
 * @module  cohortContainerActions
 * @author  smozingo
 * @date    28.May.2017
 * @description
 *
 * ************************************
 */

import * as types from '../actionTypes';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

export const fetchCampusListThunk = () => dispatch => {
  console.log(`in fetchCampusListThunk`);

  // fetch the Campus list from csdb and dispatch accordingly
  fetch('http://localhost:8080/campusList', { method: 'get' })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of campus ids
      // and a corresponding array of objects
      console.log('fetch CAMPUSES: responseData', responseData);
      const campuses = responseData.map(campus => campus.campus_id);
      const campusesById = responseData.reduce((acc, curr, i) => {
        acc[campuses[i]] = curr;
        return acc;
      }, {});

      const campusList = { campuses, campusesById };
      dispatch(setCampusList(campusList));

      // default the current campus to the first in the list
      dispatch(setCurrentCampusFetchPrograms(campuses[0]));
    })
    .catch(err => dispatch(fetchError(err)));
};

export const fetchProgramListThunk = (campusId) => dispatch => {
  console.log(`in fetchProgramListThunk - campusId:${campusId}`);

  // fetch the Program list from csdb and dispatch accordingly
  const headers = new Headers({ 'Content-Type': 'application/json' });
  fetch('http://localhost:8080/programList',
    {
      method: 'post',
      headers,
      body: JSON.stringify({ campusId: campusId }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects
      console.log('fetch PROGRAM: responseData', responseData);
      const programs = responseData.map(program => program.program_id);
      const programsById = responseData.reduce((acc, curr, i) => {
        acc[programs[i]] = curr;
        return acc;
      }, {});

      const programList = { programs, programsById };
      console.log('programs:', programList);
      dispatch(setProgramList(programList));

      // default the current program to the first in the list
      dispatch(setCurrentProgramFetchCohorts(programs[0]));
    })
    .catch(err => dispatch(fetchError(err)));
};

export const fetchCohortListThunk = (programId) => dispatch => {
  console.log(`in fetchCohortListThunk - programId: ${programId}`);

  // fetch the Cohort list from csdb and dispatch accordingly
  const headers = new Headers({ 'Content-Type': 'application/json' });
  fetch('http://localhost:8080/cohortList',
    {
      method: 'post',
      headers,
      body: JSON.stringify({ programId: programId }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects
      console.log('fetch COHORT: responseData', responseData);
      const cohorts = responseData.map(cohort => cohort.cohort_id);
      const cohortsById = responseData.reduce((acc, curr, i) => {
        acc[cohorts[i]] = curr;
        return acc;
      }, {});

      const cohortList = { cohorts, cohortsById };
      dispatch(setCohortList(cohortList));

      // default the current cohort to the first in the list
      dispatch(setCurrentCohort(cohorts[0]));
    })
    .catch(err => dispatch(fetchError(err)));
};

export const setCampusList = campusList => ({
  type: types.SET_CAMPUS_LIST,
  payload: campusList,
});

export const setProgramList = programList => ({
  type: types.SET_PROGRAM_LIST,
  payload: programList,
});

export const setCohortList = cohortList => ({
  type: types.SET_COHORT_LIST,
  payload: cohortList,
});

export const setCurrentCampus = (campusId) => {
  console.log(`in setCurrentCampus ${campusId}`);
  return {
    type: types.SET_CURRENT_CAMPUS,
    payload: Number(campusId),
  };
};

export const setCurrentProgram = (programId) => {
  console.log(`in setCurrentProgram ${programId}`);
  return {
    type: types.SET_CURRENT_PROGRAM,
    payload: Number(programId),
  };
};

export const setCurrentCohort = (cohortId) => {
  console.log(`in setCurrentCohort ${cohortId}`);

  // make sure that the selected item represents the current cohort
  document.getElementById('cohortSelect').value = cohortId;
  return {
    type: types.SET_CURRENT_COHORT,
    payload: Number(cohortId),
  };
};

export const setCurrentCampusFetchPrograms = (campusId) => dispatch => {
  // if we've got a new campus, go fetch the associated programs
  console.log(`in setCurrentCampus ${campusId} - fetching ProgramList`);
  console.log('dispatch', typeof dispatch, dispatch);
  dispatch(fetchProgramListThunk(campusId));
  dispatch(setCurrentCampus(campusId));
};

export const setCurrentProgramFetchCohorts = (programId) => dispatch => {
  // if we've got a new program, go fetch the associated cohorts
  console.log(`in setCurrentProgramfetchCohorts ${programId} - fetching CohortList`);
  dispatch(fetchCohortListThunk(programId));
  dispatch(setCurrentProgram(programId));

  // make sure that the selected item represents the current program
  document.getElementById('programSelect').value = programId;
};

const fetchError = err => ({
  type: types.FETCH_ERROR,
  errorText: err,
  error: true,
});
