import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentFlashcard from './StudentFlashcard.jsx';
import CohortContainer from './CohortContainer.jsx';
import Carousel from 'nuka-carousel';
import fetchStudentFacecardsThunk from '../actions/creators/facecardsActions';

const mapStateToProps    = store    => ({
  students: store.facecardsState.students,
  currentCohort: store.cohortState.currentCohort,
  cohortsById: store.cohortState.cohortsById,
});

const mapDispatchToProps = dispatch => ({
  getStudentFacecards: cohortId => { (cohortId) ? dispatch(fetchStudentFacecardsThunk(cohortId)) : null },
});

class Facecards extends Component {
  constructor(props) {
    super(props);
    console.log(`In Facecards. Props:${Object.keys(props)}`);
    this.flashcards = [];
    this.studentList = [];
  }

  showName(event) {
    const first = document.querySelector('#' + event.target.parentElement.id + ' > span.first');
    const last = document.querySelector('#' + event.target.parentElement.id + ' > span.last');

    // hide the '?' and show the first and last names
    event.target.classList.add('hidden');
    first.classList.remove('hidden');
    last.classList.remove('hidden');
  }

  render() {
    console.log(`rendering Facecards students:${this.props.students.length}`);
    this.flashcards = this.props.students.map(function (student, i) {
      return (
        <StudentFlashcard
          key={i}
          id={i}
          currentCohort={this.props.currentCohort}
          showName={this.showName}
          hidden="hidden"
          firstName={student.first_name}
          lastName={student.last_name}
          img={student.img}
        />
      );
    }.bind(this));

    console.log('Curr:' + this.props.currentCohort);
    console.log(this.props.cohortsById);
    const cohortLine = this.props.currentCohort ?
      <div className="cohort">COHORT<span className="blue">{this.props.cohortsById[this.props.currentCohort].cohort_name}</span></div> :
      <div className="cohort"></div>;

    return (
      <div>
        <CohortContainer />
        <div className="clear"></div>
        <div id="playFacecards" onClick={() => this.props.getStudentFacecards(this.props.currentCohort)}>
          Play
        </div>
        <section id="facecards" className="container">
          <div className="row person">
            <Carousel>
              {this.flashcards}
            </Carousel>
          </div>

          <div className="row">
            <div className="info">
              <div className="logo">CODESMITH<span className="blue">FACECARDS</span></div>
              {cohortLine}
            </div>
          </div>
        </section>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Facecards);
