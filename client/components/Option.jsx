import React from 'react';

const Option = (props) => (
  <option id={props.id} value={props.value}>{props.name}</option>
);

export default Option;
