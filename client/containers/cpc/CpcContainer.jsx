import React from 'react';
import CampusSelect from './CampusSelect.jsx';
import ProgramSelect from './ProgramSelect.jsx';
import CohortSelect from './CohortSelect.jsx';

const cpcContainer = (props) => (
    <div id="cpcDashboard">
      <header>
        <div id="cpcMenu">
          <CampusSelect/>
          <ProgramSelect/>
          <CohortSelect/>
        </div>
      </header>
    </div>
);

export default cpcContainer;

