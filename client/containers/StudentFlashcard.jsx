import React from 'react';

const StudentFlashcard = (props) => {
  const img = './client/assets/images/' + props.img;

  const showName = (event) => {
    const first = document.querySelector('#' + event.target.parentElement.id + ' > span.first');
    const last = document.querySelector('#' + event.target.parentElement.id + ' > span.last');

    // hide the '?' and show the first and last names
    event.target.classList.add('hidden');
    first.classList.remove('hidden');
    last.classList.remove('hidden');
  };

  return (
    <div id={'card' + props.id} >
      <div id={'name' + props.id} className="name" onClick={showName}>
        <span id={'question' + props.id} className="question">?</span>
        <span className="first hidden">{props.firstName}</span> <span className="last blue hidden">{props.lastName}</span></div>
      <div className="row">
        <div><img className='image' src={img}/></div>
      </div>
    </div>
  );
};

export default StudentFlashcard;
