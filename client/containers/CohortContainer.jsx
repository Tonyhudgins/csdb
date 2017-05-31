import React, { Component } from 'react';
import CampusSelect from './CampusSelect.jsx';
import ProgramSelect from './ProgramSelect.jsx';
import CohortSelect from './CohortSelect.jsx';


const CohortContainer = (props) => (
    <div id="cohortDashboard" className="container">
      <header>
        <div id="cpcMenu">
          <CampusSelect/>
          <ProgramSelect/>
          <CohortSelect/>
        </div>
      </header>
    </div>
);

export default CohortContainer;

