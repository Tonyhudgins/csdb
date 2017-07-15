import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as cpcActions from '../actions/creators/cpcContainerActions';

const mapStateToProps = store => ({
    studentsById:   store.cpcState.studentsById,
    currentStudent: store.cpcState.currentStudent,
    currentCohort:  store.cpcState.currentCohort,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDrop: (files, image_type, student_id, cohort_id) => {
        console.log(`Dropped ${files[0].name} (${image_type}) for ${student_id} cohort:${cohort_id}`);
        dispatch(cpcActions.postStudentImageThunk(files[0], image_type, student_id, cohort_id));
    },
});

class FileDropzone extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('image on render', this.props);

    return (
      <section>
        <div>
          <Dropzone className="dropzone" accept="image/*" multiple={false} disablePreview={false}
                    onDrop={(files) => this.props.onDrop(files, this.props.name,
                        this.props.currentStudent, this.props.currentCohort)}>
              {this.props.image !== null ?
                  <div> {this.props.overlay ? <div className={this.props.overlay}></div> : null}
                    <div><img className="dropzonePreview" src={this.props.image} /></div>
                  </div> :
                  <div><span className="dropzonePlus">+</span><p>{this.props.label}</p>
                    <p>Drag and drop file or click to browse</p>
                  </div>
              }
          </Dropzone>
        </div>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDropzone);
