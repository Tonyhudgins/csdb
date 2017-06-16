import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentFlashcard from './StudentFlashcard.jsx';
import CpcContainer from '../cpc/CpcContainer.jsx';
import Carousel from 'nuka-carousel';
import fetchStudentFacecardsThunk from '../../actions/creators/facecardsActions';

const mapStateToProps    = store    => ({
  students: store.cpcState.students,
  studentsById: store.cpcState.studentsById,
  currentCohort: store.cpcState.currentCohort,
  cohortsById: store.cpcState.cohortsById,
});

const mapDispatchToProps = dispatch => ({
  getStudentFacecards: cohortId => { cohortId ? dispatch(fetchStudentFacecardsThunk(cohortId)) : null; },
});

const showName = event => {
  const first = document.querySelector('#' + event.target.parentElement.id + ' > span.first');
  const last = document.querySelector('#' + event.target.parentElement.id + ' > span.last');

  // hide the '?' and show the first and last names
  event.target.classList.add('hidden');
  first.classList.remove('hidden');
  last.classList.remove('hidden');
};

const Facecards = (props) => {

  const cohort = (props.currentCohort && props.cohortsById[props.currentCohort]) ?
    props.cohortsById[props.currentCohort] : {};

  //const students = (props.currentStudent && props.studentsById) ? props.studentsById : {};

  return (
    <div>
      <CpcContainer />
      <div className="clear"></div>
      <div id="playFacecards"
           onClick={() => props.getStudentFacecards(props.currentCohort)}>
        Play
      </div>
      <section id="facecards" className="container">
        <div className="row person">
          <Carousel>
            {
              props.students.map((student, i) => (
                <StudentFlashcard
                  key={i}
                  id={i}
                  currentCohort={props.currentCohort}
                  showName={showName}
                  firstName={props.studentsById[student].first_name}
                  lastName={props.studentsById[student].last_name}
                  img={'./client/assets/images/' + props.currentCohort + '/' + props.studentsById[student].bio_img}
                />))
            }
          </Carousel>
        </div>

        <div className="row">
          <div className="info">
            <div className="logo">CODESMITH<span className="blue">FACECARDS</span></div>
            {
              props.currentCohort ?
              <div className="cohort">COHORT
                <span className="blue">{cohort.cohort_name}</span>
              </div> :
              <div className="cohort"></div>
            }
          </div>
        </div>
      </section>
    </div>
  )};

export default connect(mapStateToProps, mapDispatchToProps)(Facecards);
