import React from 'react';
import StudentFlashcard from './StudentFlashcard.jsx';
import Carousel from 'nuka-carousel';

const Facecards = ({ showName, students }) => {

  console.log('In Facecards');

  // shuffle the students
  function shuffleArray(students) {
    for (let i = students.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = students[i];
      students[i] = students[j];
      students[j] = temp;
    }

    return students;
  }

  const studentList = shuffleArray(students);

  const flashcards = [];

  for (let i = 0; i < studentList.length; i++) {
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

  return (
    <section id="facecards" className="container">
      <div className="row person">
        <Carousel>
          {flashcards}
        </Carousel>
      </div>

      <div className="row">
        <div className="info">
          <div className="logo">CODESMITH<span className="blue">FACECARDS</span></div>
          <div className="cohort">COHORT<span className="blue">14</span></div>
        </div>
      </div>
    </section>
  );
};

export default Facecards;
