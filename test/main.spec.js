/**
 * ************************************
 *
 * @module  main.spec.js
 * @author  smozingo
 * @date    8/22/17
 * @description tests for the main component
 *
 * ************************************
 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Switch, Route } from 'react-router-dom';
import Main from '../client/containers/Main.jsx';

describe('Main Panel', function() {
  let wrapper;

  beforeEach(function() {
    wrapper = shallow(<Main/>);
  });

  it('should contain switched routes', function() {
    expect(wrapper.find(Switch)).length.to.be.length(1);
    expect(wrapper.find(Route)).length.to.be.at.least(1);
  });

  it('routes should render components', function() {
    expect(wrapper.find(Route)).to.have.property('render')
  })

});

