/**
 * ************************************
 *
 * @module  CohortFileUpload
 * @author  smozingo
 * @date    7/10/17
 * @description
 *
 * ************************************
 */

import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as cpcActions from '../actions/creators/cpcContainerActions';
import csv from 'csv';

const mapStateToProps = store => ({
  campus:   store.cpcState.currentCampus && store.cpcState.campusesById[store.cpcState.currentCampus] ? store.cpcState.campusesById[store.cpcState.currentCampus].name : '',
  program:  store.cpcState.currentProgram && store.cpcState.programsById[store.cpcState.currentProgram] ? store.cpcState.programsById[store.cpcState.currentProgram].program_name : '',
  cohort:   store.cpcState.currentCohort && store.cpcState.cohortsById[store.cpcState.currentCohort] ? store.cpcState.cohortsById[store.cpcState.currentCohort].cohort_name : '',
  students: store.cpcState.students,
  currentCohort: store.cpcState.currentCohort,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDrop: (files, cohort_id) => {
    // set up an array to hold all the student information
    const studentData = [];
    console.log(`Dropped ${files[0].name} cohort:${cohort_id}`);
    const reader = new FileReader();
    reader.onload = () => {
      console.log('in onload', reader.result);
      csv.parse(reader.result,{ columns: true }, (err, data) => {
        if(err) {
          console.log(err);
          return;
        }

        console.log(data);
        dispatch(cpcActions.postBulkStudentsThunk(data, cohort_id));
      });
    };
    reader.readAsBinaryString(files[0]);
  },
});

class CohortFileUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('CohortFileUpload on render', this.props);

    return (
      <section id="cohortFileUpload">
        { this.props.students && this.props.students.length ?
          <div>
            <h1>{this.props.campus} - {this.props.program} - {this.props.cohort} already contains {this.props.students.length} students.</h1>
            <h1>In order to bulk add students, please select or create a new cohort.  New cohorts can be created in the cohort tab above.</h1>
          </div>
          :
          <div>
            <h4>Provide a comma separated file with the following field names supplied in the first record.  Not all fields are required, but all records must follow the same format.  Do not quote strings.</h4>
            <div>
              <div id="cohortFileSpec">
                <table className="tg">
                  <tbody>
                    <tr>
                      <th>Field</th>
                      <th>Data Type</th>
                      <th>Notes</th>
                    </tr>
                    <tr>
                      <td>first_name</td>
                      <td>varchar</td>
                      <td>required</td>
                    </tr>
                    <tr>
                      <td>middle_name</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>last_name</td>
                      <td>varchar</td>
                      <td>required</td>
                    </tr>
                    <tr>
                      <td>street_address_1</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>street_address_2</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>city</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>state</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>zip_code</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>email</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>primary_phone</td>
                      <td>varchar</td>
                      <td><em>3105551212</em></td>
                    </tr>
                    <tr>
                      <td>secondary_phone</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>emergency_contact</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>emergency_contact_phone</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>github_name</td>
                      <td>varchar</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>bio_img</td>
                      <td>varchar</td>
                      <td><em>studentName.jpg</em></td>
                    </tr>
                    <tr>
                      <td>codesmith_img</td>
                      <td>varchar</td>
                      <td><em>studentName.png</em></td>
                    </tr>
                    <tr>
                      <td>status</td>
                      <td>integer</td>
                      <td>1 - precourse<br/>2 - active<br/>3 - alumni<br/>4 - deferred<br/>5 - deleted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="cohortFileDropzone">
                <Dropzone className="dropzone" accept=".csv" multiple={false} disablePreview={false}
                          onDrop={(files) => this.props.onDrop(files, this.props.currentCohort)}>
                  <div><span className="dropzonePlus">+</span><p>Cohort File</p>
                    <p>Drag and drop file or click to browse</p>
                  </div>
                </Dropzone>
              </div>
            </div>
          </div>

        }
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CohortFileUpload);

