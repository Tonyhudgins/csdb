/**
 * ************************************
 *
 * @module  facecardsActions
 * @author  smozingo
 * @date    28.May.2017
 * @description
 *
 * ************************************
 */
import * as types from '../actionTypes';

const setStudentFacecards = (students) => ({
    type: types.SET_FACECARDS,
    payload: students,
  });

const fetchError = err => ({
  type: types.FETCH_ERROR,
  errorText: err,
  error: true,
});

// shuffle the student
const shuffleArray = students => {
  const shuffled = students.slice();

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled;
};

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

const fetchStudentFacecardsThunk = (cohortId) => dispatch => {
  console.log(`in fetchStudentFacecardsThunk - cohortId:${cohortId}`);

  // fetch the student data from the server
  const headers = new Headers({ 'Content-Type': 'application/json' });
  fetch('http://localhost:8080/bioImg',
    {
      method: 'post',
      headers,
      body: JSON.stringify({ cohortId: cohortId }),
    })
    .then(status)
    .then(json)
    .then(function (responseData) {
      console.log('fetch FACECARDS: responseData', responseData);

      // shuffle the results and set the img location before we send them off
      const students = shuffleArray(responseData);
      students.forEach(student => {
        student.img = `./client/assets/images/${cohortId}/${student.bio_img}`;
      });

      dispatch(setStudentFacecards(students));

    })
    .catch(err => dispatch(fetchError(err)));
};

export default fetchStudentFacecardsThunk;
