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

const getStudentFacecards = (students) => ({
    type: types.GET_FACECARDS,
    payload: students,
  });

const fetchError = err => ({
  type: types.FETCH_ERROR,
  errorText: err,
  error: true,
});

// shuffle the students
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

// fetch the student data from the server
const getStudentList = cohortId => (
  new Promise((resolve, reject) => {
    fetch('http://localhost:8080/bioImg',
      {
        method: 'post',
        data: { cohort_id: cohortId },
      })
      .then(responseData => {
        console.log(`fetch success: ${responseData}`);

        // shuffle the results and set the img location before we send them off
        const students = shuffleArray(responseData).map(student => {
          student.img = './client/assets/images/' + student.img;
          return student;
        });

        return resolve(students);

      })
      .catch(err => reject(err));
  })
);

const getStudentFacecardsThunk = (cohortId = 1) => dispatch => {
  console.log(`in getStudentsFacecardsThunk`);

  // fetch the student list from csdb and dispatch accordingly
  getStudentList(cohortId)
    .then(students => dispatch(getStudentFacecards(students)))
    .catch(err     => dispatch(fetchError(err)));
};

export default getStudentFacecardsThunk;
