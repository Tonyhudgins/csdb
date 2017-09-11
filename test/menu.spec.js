/**
 * ************************************
 *
 * @module  menu.spec.js
 * @author  smozingo
 * @date    8/21/17
 * @description test file for menu component
 *
 * ************************************
 */

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Menu from '../client/containers/Menu.jsx';
import { Link } from 'react-router-dom';


describe('Menu Panel', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<Menu/>);
  });

  it('should contain Links', function() {
    expect(wrapper.find(Link)).length.to.be.at.least(1);
  });

  it('should be split into sections', function() {
    expect(wrapper.find('section')).length.to.be.at.least(1);
  })
});

