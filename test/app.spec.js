/**
 * ************************************
 *
 * @module  app.spec.js
 * @author  smozingo
 * @date    8/21/17
 * @description test file for app component
 *
 * ************************************
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from  '../client/App.jsx';
import Menu from '../client/containers/Menu.jsx';
import Main from '../client/containers/Main.jsx';

describe('Application', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<App/>);
  });

  it('should display a Menu', function() {
    expect(wrapper.find(Menu)).to.have.lengthOf(1);
  });

  it('should have a landing area for applications (menu selections)', function() {
    expect(wrapper.find(Main)).to.have.length(1);
  });


});

