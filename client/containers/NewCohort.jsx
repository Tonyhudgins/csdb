import React from 'react';

const NewCohort = (props) => (
  <section>
    <div id="newCohort" className="container">
      <h1>Create Cohort</h1>
      <form>

      </form>
      <label htmlFor="cohortFile">Upload CSV</label>
      <input type="file" id="cohortFile" name="cohortFile"
             accept=".csv" onChange={props.uploadCohortFile} />

    </div>
  </section>
);

export default NewCohort;
