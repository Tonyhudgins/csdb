/**
 * ************************************
 *
 * @module  cpcContainerActions
 * @author  smozingo
 * @date    28.May.2017
 * @description Provides for fetching/updating Campus/Program/Cohort/Student data
 *
 * ************************************
 */

import * as types from '../actionTypes';

/*
 ACTIONS - These get dispatched to the appropriate reducers to update state
*/
export const setCampusList = (campusList, mode) => {
  const list = { payload: campusList };
  list.type = (mode === 'fetchAll') ? types.SET_CAMPUS_LIST : types.SET_CAMPUS_DROPDOWN_LIST;
  return list;
};

export const setProgramList = (programList, mode) => {
  const list = { payload: programList };
  list.type = (mode === 'fetchAll') ? types.SET_PROGRAM_LIST : types.SET_PROGRAM_DROPDOWN_LIST;
  return list;
};

export const setCohortList = (cohortList, mode) => {
  const list = { payload: cohortList };
  list.type = (mode === 'fetchAll') ? types.SET_COHORT_LIST : types.SET_COHORT_DROPDOWN_LIST;
  return list;
};

export const setStudentList = studentList => ({
  type: types.SET_STUDENT_LIST,
  payload: studentList,
});

export const setCurrentCampus = campusId => ({
  type: types.SET_CURRENT_CAMPUS,
  payload: Number(campusId),
});

export const setCurrentProgram = programId => ({
  type: types.SET_CURRENT_PROGRAM,
  payload: Number(programId),
});

export const setCurrentCohort = cohortId => ({
  type: types.SET_CURRENT_COHORT,
  payload: Number(cohortId),
});

export const setCurrentStudent = studentId => {

  // update the select dropdown first!
  document.getElementById('studentSelect').value = studentId;
  return ({
    type: types.SET_CURRENT_STUDENT,
    payload: Number(studentId),
  });
};

export const updateCurrentStudent = (field, value) => ({
  type: types.SET_STUDENT_DATA,
  field: field,
  payload: value,
});

export const updateNewStudent = (field, value) => ({
  type: types.SET_NEW_STUDENT_DATA,
  field: field,
  payload: value,
});

const fetchError = (err, source) => ({
  type: types.FETCH_ERROR,
  source,
  err,
  error: true,
});

/*
 Here's where we dispatch actions to update the Campus -> Program -> Cohort -> Students chain
*/
export const setCurrentCampusFetchPrograms = (campusId, mode, operation) => dispatch => {
  // if we've got a new campus, go fetch the associated programs
  //console.log(`in setCurrentCampus ${campusId} - fetching ProgramList`);
  //console.log('dispatch', typeof dispatch, dispatch);
  dispatch(fetchProgramListThunk(campusId, mode, operation));
  dispatch(setCurrentCampus(campusId));
};

export const setCurrentProgramFetchCohorts = (programId, mode, operation) => dispatch => {
  // if we've got a new program, go fetch the associated cohorts
  console.log(`in setCurrentProgramFetchCohorts ${programId} - fetching CohortList (${mode})`);
  dispatch(fetchCohortListThunk(programId, mode, operation));
  dispatch(setCurrentProgram(programId, mode));

  // make sure that the selected item represents the current program
  const element = `${mode}ProgramSelect`;
  console.log(`updating ${element} to ${programId}`);
  document.getElementById(`${mode}ProgramSelect`).value = programId;
};

export const setCurrentCohortFetchStudents = (cohortId, mode) => dispatch => {
  // if we've got a new cohort, go fetch the associated students
  console.log(`in setCurrentCohortFetchStudents ${cohortId} - fetching StudentList (${mode})`);
  dispatch(fetchStudentListThunk(cohortId));
  dispatch(setCurrentCohort(cohortId));

  // make sure that the selected item represents the current cohort
  const element = `${mode}CohortSelect`;
  console.log(`updating ${element} to ${cohortId}`);
  document.getElementById(`${mode}CohortSelect`).value = cohortId;
};

/*
 DB fetch utilities
*/
function status(response) {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return response.json().then(json => {
    const error = new Error(json.message || response.statusText);
    return Promise.reject(Object.assign(error, { response }));
  });
}

function json(response) {
  return response.json();
}

/*
  Async fetch calls to the database
*/
export const fetchCampusListThunk = (mode, operation) => dispatch => {
  console.log(`in fetchCampusListThunk mode: ${mode}`);

  // fetch the Campus list from csdb and dispatch accordingly
  fetch('http://localhost:8080/campusList', { method: 'get' })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of campus ids
      // and a corresponding array of objects, indexed by the campus ids
      //console.log('fetch CAMPUSES: responseData', responseData);
      const campuses = responseData.map(campus => campus.campus_id);
      const campusesById = responseData.reduce((acc, curr, i) => {
        acc[campuses[i]] = curr;
        return acc;
      }, {});

      // update the campus list in redux
      const campusList = { campuses, campusesById };
      dispatch(setCampusList(campusList, mode));

      // default the current campus to the first in the list and fetch programs
      dispatch(setCurrentCampusFetchPrograms(campuses[0], mode, operation));
    })
    .catch(err => dispatch(fetchError(err, 'fetchCampusListThunk')));
};

export const fetchProgramListThunk = (campusId, mode, operation) => dispatch => {
  console.log(`in fetchProgramListThunk - campusId:${campusId} mode: ${mode}`);

  // fetch the Program list from csdb and dispatch accordingly
  fetch('http://localhost:8080/programList',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ where: { campus_id: campusId } }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the program ids
      //console.log('fetch PROGRAM: responseData', responseData);
      const programs = responseData.map(program => program.program_id);
      const programsById = responseData.reduce((acc, curr, i) => {
        acc[programs[i]] = curr;
        return acc;
      }, {});

      const programList = { programs, programsById };
      dispatch(setProgramList(programList, mode));

      // default the current program to the first in the list and fetch cohorts
      dispatch(setCurrentProgramFetchCohorts(programs[0], mode, operation));
    })
    .catch(err => dispatch(fetchError(err, 'fetchProgramListThunk')));
};

export const fetchCohortListThunk = (programId, mode, operation) => dispatch => {
  console.log(`in fetchCohortListThunk - programId: ${programId} mode: ${mode} op: ${operation}`);

  // fetch the Cohort list from csdb and dispatch accordingly
  fetch('http://localhost:8080/cohortList',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ where: { program_id: programId } }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the cohort ids
      //console.log('fetch COHORT: responseData', responseData);
      const cohorts = responseData.map(cohort => cohort.cohort_id);
      const cohortsById = responseData.reduce((acc, curr, i) => {
        acc[cohorts[i]] = curr;
        return acc;
      }, {});

      const cohortList = { cohorts, cohortsById };
      dispatch(setCohortList(cohortList, mode));

      switch (mode) {
        case 'dropdown':
          if (operation === 'edit')
            dispatch(updateCurrentStudent('cohort_id', cohorts[0]));
          else if (operation === 'add')
            dispatch(updateNewStudent('cohort_id', cohorts[0]));
          else
            console.error(`invalid operation in fetchCohortListThunk: ${operation}`)
          break;
        case 'fetchAll':
          dispatch(setCurrentCohortFetchStudents(cohorts[0], mode));
          break;
        default:
          console.error(`cpcContainerActions fetchCohortListThunk invalid mode ${mode}`);
      }
    })
    .catch(err => dispatch(fetchError(err, 'fetchCohortListThunk')));
};

export const fetchStudentListThunk = (cohortId, studentId) => dispatch => {
  console.log(`in fetchStudentListThunk - cohortId: ${cohortId} studentId: ${studentId}`);
  const criteria = {};
  if (cohortId)  criteria.cohort_id = cohortId;
  if (studentId) criteria.student_id = studentId;
  let students;
  let studentsById;

  // fetch the Cohort list from csdb and dispatch accordingly
  const headers = new Headers({ 'Content-Type': 'application/json' });
  fetch('http://localhost:8080/studentList',
    {
      method: 'post',
      headers,
      body: JSON.stringify({ where: criteria }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the cohort ids
      console.log('fetch STUDENTS: responseData', responseData);
      students = responseData.map(student => student.student_id);
      studentsById = responseData.reduce((acc, curr, i) => {
        acc[students[i]] = curr;
        return acc;
      }, {});

      // update the student list in redux
      const studentList = { students, studentsById };
      dispatch(setStudentList(studentList));

      // default the current student to the first in the list
      console.log('Setting current student to ', students[0]);
      dispatch(setCurrentStudent(students[0]));
    })
    .catch(err => dispatch(fetchError(err, 'fetchStudentListThunk')));
};

/*
  Async posts to do database updates
*/
export const postCurrentStudentThunk = (student) => dispatch => {
  console.log(`in postCurrentStudentThunk - studentId: ${student.student_id}`);
  const criteria = {};

  // fetch the Cohort list from csdb and dispatch accordingly
  fetch('http://localhost:8080/updateStudent',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: student, where: { student_id: student.student_id } }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the cohort ids
      console.log('post STUDENT: responseData', responseData);

    })
    .catch(err => dispatch(fetchError(err, 'postCurrentStudentThunk')));
};

export const postNewStudentThunk = (student) => dispatch => {
  console.log(`in postNewStudentThunk - studentId: ${student.student_id}`);
  const criteria = {};

  // fetch the Cohort list from csdb and dispatch accordingly
  fetch('http://localhost:8080/createStudent',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: student }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the cohort ids
      console.log('post New STUDENT: responseData', responseData);

    })
    .catch(err => dispatch(fetchError(err, 'postNewStudentThunk')));
};
