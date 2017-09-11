import React from 'react';
import CampusSelect from './CampusSelect.jsx';
import ProgramSelect from './ProgramSelect.jsx';
import CohortSelect from './CohortSelect.jsx';

const cpcContainer = (props) => (
    <div id="cpcDashboard">
      <header>
        <div id="cpcMenu">
          { props.exclude && props.exclude.match(/CampusSelect/)  ? null : <CampusSelect/> }
          { props.exclude && props.exclude.match(/ProgramSelect/) ? null : <ProgramSelect/> }
          { props.exclude && props.exclude.match(/CohortSelect/)  ? null : <CohortSelect/> }
        </div>
      </header>
    </div>
);

export default cpcContainer;

