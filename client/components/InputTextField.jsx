/**
 * ************************************
 *
 * @module  InputTextField
 * @author  smozingo
 * @date    8/25/17
 * @description
 *
 * ************************************
 */

import React from 'react';

const InputTextField = (props) => (
  <input id={props.id} name={props.name} className={props.className}
         placeholder={props.placeholder} type="text" value={props.value}
         onChange={props.onChange}/>
);

export default InputTextField;