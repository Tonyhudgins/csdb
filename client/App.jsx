import React, { Component } from 'react';
import Menu from './containers/Menu.jsx';
import Main from './containers/Main.jsx';
import Facecards from './containers/Facecards.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    // function bindings
    this.showName = this.showName.bind(this);
    this.uploadCohortFile = this.uploadCohortFile.bind(this);

    // state
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    const studentArr = [];

    // NOTE: This should be moved to the Facecards component
    // when we get Redux working!!!
    // Grab all student bio images from csdb
    $.post('http://localhost:8080/bioImg', { cohort_id: 1 })
      .done((data) => {

        data.forEach(student => {
          student.img = './client/assets/images/' + student.img;
          studentArr.push(student);
        });

        this.setState({ students: studentArr });
      })
      .fail((err) => {
        console.log('failed post ', err);
      });
  }

  showName(event) {
    const first = document.querySelector('#' + event.target.parentElement.id + ' > span.first');
    const last = document.querySelector('#' + event.target.parentElement.id + ' > span.last');

    // hide the '?' and show the first and last names
    event.target.classList.add('hidden');
    first.classList.remove('hidden');
    last.classList.remove('hidden');
  }

  uploadCohortFile(event) {
    console.log('in ucf');
    const file = document.querySelector('#' + event.target.id).files[0];
    console.log('ucf', file);
  }

  // displayed on page
  render() {
    return (
      <div>
        <nav id="menuPanel">
          <div id="logo">
            <img src="./client/assets/images/csLogoTransSm.png" />
            <span id="logoDashboard">Dashboard</span>
          </div>
          <div className="clear"></div>
          <Menu className="menu" />
        </nav>
        <Main showName={this.showName}
              uploadCohortFile={this.uploadCohortFile}
              students={this.state.students}
              className="main" />
      </div>
    );
  }
}

export default App;
