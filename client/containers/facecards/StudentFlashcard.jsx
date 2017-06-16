import React from 'react';

const StudentFlashcard = (props) => {
  console.log('SCHNO rendering StudentFlashcard');
  const showName = (event) => {
    let id = event.target.id.slice(8);
    console.log(`SCHNO ID ${id}`);
    const first = document.querySelector('#first' + id);
    const last = document.querySelector('#last' + id);

    // hide the '?' and show the first and last names
    event.target.classList.add('hidden');
    first.classList.remove('hidden');
    last.classList.remove('hidden');
  };

  // reset hidden names -- these don't reset on re-render :(
  if (document.querySelector(`#question${props.id}`)) {
    document.querySelector(`#first${props.id}`).classList.add('hidden');
    document.querySelector(`#last${props.id}`).classList.add('hidden');
    document.querySelector(`#question${props.id}`).classList.remove('hidden');
  }

  return (
    <div id={`card${props.id}`} >
      <div id={`name${props.id}`} className="name">
        <span id={`question${props.id}`} className="question" onClick={showName}>?</span>
        <span id={`first${props.id}`} className={'first hidden'}>{props.firstName} </span>
        <span id={`last${props.id}`} className={'last blue hidden'}>{props.lastName}</span>
      </div>
      <div className="facecardImg">
        <img className='image' src={props.img}/>
      </div>
    </div>
  );
};

export default StudentFlashcard;
