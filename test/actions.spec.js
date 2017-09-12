import { setCampusList } from '../client/actions/creators/cpcContainerActions';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import * as types from '../client/actions/actionTypes';


describe('Set Campus List', () => {
  
  it('should set the correct type with fetchAll', () => {
    const action = setCampusList('LA', 'fetchAll');
    expect(action.type).to.equal(types.SET_CAMPUS_LIST)
  });

  it('should set the correct type without fetchAll', () => {
    const action = setCampusList('LA', 'fetch');
    expect(action.type).to.equal(types.SET_CAMPUS_DROPDOWN_LIST);
  });

  it('should have the correct payload', () => {
    const action = setCampusList('Go Lakers', 'fetchAll');
    expect(action.payload).to.equal('Go Lakers');
  })
});
