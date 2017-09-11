import React from 'react';
import Option from './Option.jsx';

const USStates = (props) => {

        const stateList = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
        "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
        "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",
        "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",
        "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

  const states = stateList.map((state, i) => (
    <Option key={i} id={'stateId' + i} value={state}
            name={state} onChange={props.onChange}/>
  ));

    const defaultState = props.selectedState ? props.selectedState : "CA";

    return (
        <select id="state" name="state" className="form-control"
                        title={props.selectedState} value={defaultState}
                        onChange={props.onChange}>
          {states}
        </select>
    );
};

export default USStates;
