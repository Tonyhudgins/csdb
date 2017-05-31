import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentFlashcard from './StudentFlashcard.jsx';
import CohortContainer from './CohortContainer.jsx';
import Carousel from 'nuka-carousel';
import getStudentFacecardsThunk from '../actions/creators/facecardsActions';

class Facecards extends Component {
  constructor(props) {
    super(props);
    console.log(`In Facecards. Props:${Object.keys(props)}`);
  /*  flashcards: [];
    studentList: [];*/
  }

  /*buildFacecards = function(flashcards) {
    for (let i = 0; i < this.studentList.length; i++) {
      flashcards[i] = (
        <StudentFlashcard
          key={i}
          id={i}
          showName={showName}
          firstName={studentList[i].first_name}
          lastName={studentList[i].last_name}
          img={studentList[i].bio_img}
        />
      );
    }
  };
*/
  render() {
    return (
    <CohortContainer>
      <section id="facecards" className="container">
        <div className="row person">
          <Carousel>
            {this.flashcards}
          </Carousel>
        </div>

        <div className="row">
          <div className="info">
            <div className="logo">CODESMITH<span className="blue">FACECARDS</span></div>
            <div className="cohort">COHORT<span className="blue">14</span></div>
          </div>
        </div>
      </section>
    </CohortContainer>
    );
  };
}

const mapStateToProps    = store    => ({ students: store.facecardsState.students });
const mapDispatchToProps = dispatch => ({
  clickHandler: cohortId => { dispatch(getStudentFacecardsThunk(cohortId)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Facecards);
