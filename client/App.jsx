/**
 * ************************************
 *
 * @module  App.jsx
 * @author  smozingo
 * @date    28.May.2017
 * @description Top level component, rendered by index.js, renders Menu and Main
 *
 * ************************************
 */

import React, { Component } from 'react';
import Menu from './containers/Menu.jsx';
import Main from './containers/Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);
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
        <Main className="main" />
      </div>
    );
  }
}

export default App;
