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
import * as constants from '../../constants';

import fetch from 'isomorphic-fetch';

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
  const studentSelect = document.getElementById('studentSelect');
  if (studentSelect) studentSelect.value = studentId;

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

export const updateCurrentCohort = (field, value) => ({
  type: types.SET_COHORT_DATA,
  field: field,
  payload: value,
});

export const updateCurrentProgram = (field, value) => ({
  type: types.SET_PROGRAM_DATA,
  field: field,
  payload: value,
});

export const updateCurrentCampus = (field, value) => ({
  type: types.SET_CAMPUS_DATA,
  field: field,
  payload: value,
});

export const updateNewStudent = (field, value) => ({
  type: types.SET_NEW_STUDENT_DATA,
  field: field,
  payload: value,
});

export const updateNewCohort = (field, value) => ({
  type: types.SET_NEW_COHORT_DATA,
  field: field,
  payload: value,
});

export const updateNewProgram = (field, value) => ({
  type: types.SET_NEW_PROGRAM_DATA,
  field: field,
  payload: value,
});

export const updateNewCampus = (field, value) => ({
  type: types.SET_NEW_CAMPUS_DATA,
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
 We use 'mode' and 'operation' here to modify behavior
 mode: dropdown|fetchAll|noop
 operation: add|edit
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
  const programSelect = document.getElementById(`${mode}ProgramSelect`);
  if (programSelect) programSelect.value = programId;
};

export const setCurrentCohortFetchStudents = (cohortId, mode) => dispatch => {
  // if we've got a new cohort, go fetch the associated student
  console.log(`in setCurrentCohortFetchStudents ${cohortId} - fetching StudentList (${mode})`);
  dispatch(fetchStudentListThunk(cohortId));
  dispatch(setCurrentCohort(cohortId));

  // make sure that the selected item represents the current cohort
  const element = `${mode}CohortSelect`;
  console.log(`updating ${element} to ${cohortId}`);
  const cohortSelect = document.getElementById(`${mode}CohortSelect`);
  if (cohortSelect) cohortSelect.value = cohortId;
};

/*
 DB fetch promise utilities
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
  console.log(`in fetchCampusListThunk mode: ${mode} operation: ${operation}`);

  // fetch the Campus list from csdb and dispatch accordingly
  fetch(constants.serverUrl + '/campusList',
      { method: 'get',
        headers: new Headers({ 'Access-Control-Allow_Origin' : true }),})
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of campus ids
      // and a corresponding array of objects, indexed by the campus ids
      //console.log('fetch CAMPUSES: responseData', responseData);
      const campuses = responseData.map(campus => campus.campus_id);
      const campusesById = responseData.reduce((acc, curr, i) => {
        // controlled form components don't like nulls, so store nulls as empty strings
        for( let key in curr ) {
          if(curr[key] === null) curr[key] = '';
        }

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
  fetch(constants.serverUrl + '/programList',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ where: { eq: { campus_id: campusId }} }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the program ids
      //console.log('fetch PROGRAM: responseData', responseData);
      const programs = responseData.map(program => program.program_id);
      const programsById = responseData.reduce((acc, curr, i) => {
        // controlled form components don't like nulls, so store nulls as empty strings
        for( let key in curr ) {
          if(curr[key] === null) curr[key] = '';
        }

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
  fetch(constants.serverUrl + '/cohortList',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ where: { eq: { program_id: programId }} }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the cohort ids
      console.log('fetch COHORT: responseData', responseData);
      const cohorts = responseData.map(cohort => cohort.cohort_id);
      const cohortsById = responseData.reduce((acc, curr, i) => {
        // controlled form components don't like nulls, so store nulls as empty strings
        for( let key in curr ) {
          if(curr[key] === null) curr[key] = '';
        }

        acc[cohorts[i]] = curr;
        return acc;
      }, {});

      const cohortList = { cohorts, cohortsById };
      dispatch(setCohortList(cohortList, mode));

      const cohort_id = (cohorts && cohorts[0]) ? cohorts[0] : null;

      if(cohort_id) {
        switch (mode) {
          case 'dropdown':
            if (operation === 'edit')
              dispatch(updateCurrentStudent('cohort_id', cohorts[0]));
            else if (operation === 'add')
              dispatch(updateNewStudent('cohort_id', cohorts[0]));
            else if (operation === 'noop')
              console.log('noop');
            else
              console.error(`invalid operation in fetchCohortListThunk: ${operation}`);
            break;
          case 'fetchAll':
            dispatch(setCurrentCohortFetchStudents(cohorts[0], mode));
            break;
          default:
            console.error(`cpcContainerActions fetchCohortListThunk invalid mode ${mode}`);
        }
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
  // these fields must be null if they have no assigned value, otherwise we get errors
  // on db updates (we can't set these to empty strings if they're null!)
  const nullFields = ['student_id','cohort_id','tech_talk_id','production_project_id',
    'precourse_part1_deadline','precourse_part2_deadline','precourse_part3_deadline'];

  // fetch the Cohort list from csdb and dispatch accordingly
  const headers = new Headers({ 'Content-Type': 'application/json' });
  fetch(constants.serverUrl + '/studentList',
    {
      method: 'post',
      headers,
      body: JSON.stringify({ where: { eq: criteria, ne: { status: constants.INACTIVE }} }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of program ids
      // and a corresponding array of objects, indexed by the cohort ids
      console.log('fetch STUDENTS: responseData', responseData);
      students = responseData.map(student => student.student_id);
      studentsById = responseData.reduce((acc, curr, i) => {
        // controlled form components don't like nulls, so store nulls as empty strings/zeros
        for( let key in curr ) {
          console.log( key, '=>', curr[key]);
          if(curr[key] === null)
            if(nullFields.includes(key))
              curr[key] = null;
            else
              curr[key] = '';
        }

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

  // fetch the Cohort list from csdb and dispatch accordingly
  fetch(constants.serverUrl + '/updateStudent',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: student, where: { eq: { student_id: student.student_id }} }),
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

  fetch(constants.serverUrl + '/createStudent',
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

export const deleteCurrentStudentThunk = (status, student_id, cohort_id) => dispatch => {
    console.log(`in deleteStudentThunk - studentId:${student_id}`);
    fetch(constants.serverUrl + '/updateStudent',
        {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ data: {status}, where: { eq: { student_id: student_id }} }),
        })
        .then(status)
        .then(json)
        .then(function (responseData) {
            // flatten the data out by creating an array of program ids
            // and a corresponding array of objects, indexed by the cohort ids
            console.log('delete STUDENT: responseData', responseData);
            dispatch(fetchStudentListThunk(cohort_id));

        })
        .catch(err => dispatch(fetchError(err, 'deleteStudentThunk')));

};

export const postStudentImageThunk = (image, image_type, student_id, cohort_id) => dispatch => {
    console.log(`in postStudentImageThunk - studentId: ${student_id} type: ${image_type} file:${image.name}`);

    // pass image data up as a formData object
    // we'll use this to upload the image and update the student in the database
    const data = new FormData();
    data.append('image', image);
    data.append('name', image.name);
    data.append('student_id', student_id);
    data.append('image_type', image_type);
    data.append('cohort_id', cohort_id);

    fetch(constants.serverUrl + '/imageUpload',
        {
            method: 'post',
            body: data,
        })
        .then(status)
        .then(json)
        .then(function (responseData) {
            // update state
            console.log('post Student Image: responseData', responseData);
            dispatch(updateCurrentStudent(image_type, image.name));

        })
        .catch(err => dispatch(fetchError(err, 'postStudentImageThunk')));
};

export const postBulkStudentsThunk = (data, cohort_id) => dispatch => {
  console.log(`in postBulkStudentsThunk - cohortId: ${cohort_id} count:${data.length}`);

  fetch(constants.serverUrl + '/bulkStudentsUpload',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({data: data, cohort_id: cohort_id }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // update state
      console.log('post Bulk Student Data: responseData', responseData);

      const cohortFileDropzone = document.getElementById(`cohortFileDropzone`);
      if(cohortFileDropzone) cohortFileDropzone.innerHtml = responseData;

    })
    .catch(err => dispatch(fetchError(err, 'postBulkStudentsThunk')));
};

export const postCurrentCohortThunk = (cohort) => dispatch => {
  console.log(`in postCurrentCohortThunk - studentId: ${cohort.cohort_id}`);

  fetch(constants.serverUrl + '/updateCohort',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: cohort, where: { eq: { cohort_id: cohort.cohort_id }} }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('post current COHORT: responseData', responseData);
    })
    .catch(err => dispatch(fetchError(err, 'postCurrentCohortThunk')));
};

export const postNewCohortThunk = (cohort) => dispatch => {
  console.log(`in postNewCohortThunk - cohortId: ${cohort.cohort_id}`);

  fetch(constants.serverUrl + '/createCohort',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: cohort }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('post New COHORT: responseData', responseData);
    })
    .catch(err => dispatch(fetchError(err, 'postNewCohortThunk')));
};


export const postCurrentProgramThunk = (program) => dispatch => {
  console.log(`in postCurrentProgramThunk - studentId: ${program.program_id}`);

  fetch(constants.serverUrl + '/updateProgram',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: program, where: { eq: { program_id: program.program_id }} }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('post current PROGRAM: responseData', responseData);
    })
    .catch(err => dispatch(fetchError(err, 'postCurrentProgramThunk')));
};

export const postNewProgramThunk = (program) => dispatch => {
  console.log(`in postNewProgramThunk - programId: ${program.program_id}`);

  fetch(constants.serverUrl + '/createProgram',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: program }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('post New PROGRAM: responseData', responseData);
    })
    .catch(err => dispatch(fetchError(err, 'postNewProgramThunk')));
};


export const postCurrentCampusThunk = (campus) => dispatch => {
  console.log(`in postCurrentCampusThunk - studentId: ${campus.campus_id}`);

  fetch(constants.serverUrl + '/updateCampus',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: campus, where: { eq: { campus_id: campus.campus_id }} }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('post current CAMPUS: responseData', responseData);
    })
    .catch(err => dispatch(fetchError(err, 'postCurrentCampusThunk')));
};

export const postNewCampusThunk = (campus) => dispatch => {
  console.log(`in postNewCampusThunk - campusId: ${campus.campus_id}`);

  fetch(constants.serverUrl + '/createCampus',
    {
      method: 'post',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ data: campus }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('post New CAMPUS: responseData', responseData);
    })
    .catch(err => dispatch(fetchError(err, 'postNewCampusThunk')));
};