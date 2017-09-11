/**
 * ************************************
 *
 * @module  adminPortal.spec.js
 * @author  smozingo
 * @date    8/25/17
 * @description tests for the admin portal
 *
 * ************************************
 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TabLink } from 'react-tabs-redux';

import AdminPortal from '../client/containers/adminPortal/AdminPortal.jsx';

describe('Admin Portal', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<AdminPortal/>);
  });

  it('should contain switched routes', function() {
    console.log(wrapper.find(TabLink));
    expect(wrapper.find(TabLink)).length.to.be.length(1);
    expect(wrapper.find(Route)).length.to.be.at.least(1);
  });

  it('routes should render components', function() {
    expect(wrapper.find(Route)).to.have.property('render')
  })

});

