import { setCampusList, setProgramList, setCohortList, setStudentList } from '../client/actions/creators/cpcContainerActions';
import { fetchCampusListThunk } from '../client/actions/creators/cpcContainerActions';
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import * as types from '../client/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
// import { status, json } from '../client/actions/creators/cpcContainerActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);



function status(response) {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return response.json().then(json => {
    const error = new Error(json.message || response.statusText);
    return Promise.reject(Object.assign(error, { response }));
  });
}

function json(response) {
  return response.json();
}


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

describe('fetchCampusListThunk', () => {
  it('should correctly fetch campuses', () => {
    const store = mockStore({});
    const expectedCampuses = [
      'Los Angeles',
      'New York'
    ];

    return fetch('http://localhost:8080/campusList', { method: 'get' })
    .then(status)
    .then(json)
    .then(function (responseData) {
      // flatten the data out by creating an array of campus ids
      // and a corresponding array of objects, indexed by the campus ids
      //console.log('fetch CAMPUSES: responseData', responseData);
      const campuses = responseData.map(campus => campus.campus_id);
      const campusesById = responseData.reduce((acc, curr, i) => {
        // controlled form components don't like nulls, so store nulls as empty strings
        for( let key in curr ) {
          if(curr[key] === null) curr[key] = '';
        }

        acc[campuses[i]] = curr;
        return acc;
      }, {});

      // update the campus list in redux
      const campusList = { campuses, campusesById };
      const campusNames = [campusesById['1'].name, campusesById['2'].name];
      expect(campusNames).to.eql(expectedCampuses);
    })
  })
})
