import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentFlashcard from './StudentFlashcard.jsx';
import CpcContainer from '../cpc/CpcContainer.jsx';
import Carousel from 'nuka-carousel';
import fetchStudentFacecardsThunk from '../../actions/creators/facecardsActions';
import * as cpcActions from '../../actions/creators/cpcContainerActions';

const mapStateToProps    = store    => ({
  students: store.cpcState.students,
  studentsById: store.cpcState.studentsById,
  currentCohort: store.cpcState.currentCohort,
  cohortsById: store.cpcState.cohortsById,
});

const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(cpcActions.fetchCampusListThunk('dropdown', 'noop'));
  },
});

const showName = event => {
  const first = document.querySelector('#' + event.target.parentElement.id + ' > span.first');
  const last = document.querySelector('#' + event.target.parentElement.id + ' > span.last');

  // hide the '?' and show the first and last names
  event.target.classList.add('hidden');
  first.classList.remove('hidden');
  last.classList.remove('hidden');
};

class Facecards extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('Facecards in CWM');
    this.props.init(this.props.operation);
  }

  render() {
    const cohort = (this.props.currentCohort && this.props.cohortsById[this.props.currentCohort]) ?
      this.props.cohortsById[this.props.currentCohort] : {};

    let studentCards = [];
    if (this.props.students && this.props.students.length) {
      // randomize the student and build our flashcard array
      studentCards = this.props.students.sort((a,b) => .5 - Math.random()).map((student, i) => (
        <StudentFlashcard
          key={i}
          id={i}
          currentCohort={this.props.currentCohort}
          showName={showName}
          firstName={this.props.studentsById[student].first_name}
          lastName={this.props.studentsById[student].last_name}
          img={'./client/assets/images/' + this.props.currentCohort + '/' + this.props.studentsById[student].bio_img}
        />
      ));
    }

    return (
      <div>
        <CpcContainer />
        <div className="clear"></div>
        <section id="facecards" className="facecardsContainer">
          <div className="person">
            <Carousel wrapAround={true}>
              {studentCards}
            </Carousel>
          </div>

          <div className="row">
            <div className="info">
              <div className="logo">CODESMITH<span className="blue">FACECARDS</span></div>
              {
                this.props.currentCohort ?
                <div className="cohort">COHORT
                  <span className="blue">{cohort.cohort_name}</span>
                </div> :
                <div className="cohort"></div>
              }
            </div>
          </div>
        </section>
      </div>
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Facecards);
