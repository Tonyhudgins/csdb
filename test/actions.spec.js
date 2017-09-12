import { setCampusList, setProgramList, setCohortList, setStudentList } from '../client/actions/creators/cpcContainerActions';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import * as types from '../client/actions/actionTypes';


describe('Set Lists', () => {

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
    });
  });

  describe('Set Program List', () => {
    it('should set the correct type with fetchAll', () => {
      const action = setProgramList('LA', 'fetchAll');
      expect(action.type).to.equal(types.SET_PROGRAM_LIST);
    });

    it('should set the correct type without fetchAll', () => {
      const action = setProgramList('LA', 'fetchOne');
      expect(action.type).to.equal(types.SET_PROGRAM_DROPDOWN_LIST);
    });

    it('should set the correct payload', () => {
      const action = setProgramList('Go Lakers', 'fetchThatRing');
      expect(action.payload).to.equal('Go Lakers');
    });
  });

  describe('Set Cohort List', () => {
    it('should set the correct type with fetchAll', () => {
      const action = setCohortList('LA', 'fetchAll');
      expect(action.type).to.equal(types.SET_COHORT_LIST);
    });

    it('should set the correct type without fetchAll', () => {
      const action = setCohortList('LA', 'fetchOne');
      expect(action.type).to.equal(types.SET_COHORT_DROPDOWN_LIST);
    });

    it('should set the correct payload', () => {
      let action = setCohortList('Go Lakers', 'fetchThatRing');
      expect(action.payload).to.equal('Go Lakers');
      action = setCohortList('Visca Barca', 'OtraTriplete');
      expect(action.payload).to.equal('Visca Barca');
    });
  });

  describe('Set Student List', () => {
    let action;
    beforeEach(() => {
      action = setStudentList(['Kobe', 'Magic', 'Kareem']);
    });

    it('should have the correct type', () => {
      expect(action.type).to.equal(types.SET_STUDENT_LIST);
    });

    it('should have the correct payload', () => {
      expect(action.payload.length).to.equal(3);
    })
  });

  
});
