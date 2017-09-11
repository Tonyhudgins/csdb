/**
 * ************************************
 *
 * @module  deleteStudentModal
 * @author  smozingo
 * @date    6/25/17
 * @description
 *
 * ************************************
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import * as cpcActions from '../../../actions/creators/cpcContainerActions';
import * as constants from '../../../constants';


const mapStateToProps = store => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

  handleDelete: (student) => {
    console.log('StudentForm Delete:', student.first_name, student.last_name);
    dispatch(cpcActions.deleteCurrentStudentThunk(constants.INACTIVE, student.student_id, student.cohort_id));
  },

});

class DeleteStudentModal extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
        this.openModal = this.openModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    openModal(event) {
        event.preventDefault();
        document.getElementById('btnDeleteStudent').classList.add('disabled');
        this.setState({ isOpen: true });
    }

    hideModal() {
        document.getElementById('deleteVerify').value = '';
        this.props.resetModal();
        this.setState({ isOpen: false });
    }

    deleteStudent(student) {
        document.getElementById('deleteVerify').value = '';
        this.setState({ isOpen: false });
        this.props.resetModal();
        this.props.handleDelete(student);
    }

    verifyName(firstName, event) {
        console.log('verify name', firstName, event.target.value);
        if(event.target.value === firstName) {
            document.getElementById('btnDeleteStudent').classList.remove('disabled');
        }
        else {
            document.getElementById('btnDeleteStudent').classList.add('disabled');
        }
    }

    backdropStyles = {
        base: {
            background: 'rgba(0, 0, 0, .7)',
            opacity: 50,
            visibility: 'hidden',
            transition: 'all 0.4s',
            overflowX: 'hidden',
            overflowY: 'auto'
        },
        open: {
            opacity: 1,
            visibility: 'visible'
        }
    };

    dialogStyles = {
        base: {
            top: -600,
            transition: 'top 0.4s'
        },
        open: {
            top: 0
        }
    };

    render() {
        const student = this.props.student;

        console.log(`DeleteStudentModal in render`, student);

        return (
            <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}
                   backdropStyles={this.backdropStyles} dialogStyles={this.dialogStyles}>
                <ModalHeader>
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle>Delete Student</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete {student.first_name} {student.last_name}?</p>
                    <label htmlFor="deleteVerify">If you're sure, please type the student's first name</label>
                    <input id="deleteVerify" name="delete_verify" className="form-control"
                           placeholder="" type="text"
                           onChange={(event) => this.verifyName(student.first_name, event)}/>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal}>
                        Close
                    </button>
                    <button id='btnDeleteStudent' className='btn btn-danger disabled'
                            onClick={(event) => this.deleteStudent(student, event)}>
                        Delete Student
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStudentModal);
