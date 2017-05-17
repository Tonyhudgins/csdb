import React, { Component } from 'react';
import Menu from './Menu.jsx';
import Main from './Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    // function bindings
    this.handleNext = this.handleNext.bind(this);
    this.showName   = this.showName.bind(this);
    this.addUser    = this.addUser.bind(this);

    // state
    this.state = {
      students: [],
    };
  }

  componentDidMount() {
    const studentArr = [];

    $.get('/bioImg', (data) => {
      data.forEach(student => studentArr.push(student));
      this.setState({ students: studentArr });
    });
  }

  // functions
  handleNext(event) {
    // go to next image
  }

  showName(event) {
    // show student name
  }

  // post to server
  addUser(event) {
    const id = '#' + event.target.id;

    $.post('/update', () => {

    });
  }

  // displayed on page
  render() {
    return (
      <div>
        <Menu addUser={this.addUser}
              className="menu" />

        <Main handleNext={this.handleNext}
              showName={this.showName}
              students={this.state.students}
              className="main" />
      </div>
    );
  }
}

export default App;
