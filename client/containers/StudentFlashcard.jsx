import React from 'react';

const StudentFlashcard = (props) => {
  const img = './client/assets/images/' + props.img;
  return (
    <div id={'card' + props.id} >
      <div id={'name' + props.id} className="name" onClick={props.showName}>
        <span id={'question' + props.id} className="question">?</span>
        <span className="first hidden">{props.firstName}</span> <span className="last blue hidden">{props.lastName}</span></div>
      <div className="row">
        <div><img className='image' src={img}/></div>
      </div>
    </div>
  );
};

export default StudentFlashcard;
