/**
 * ************************************
 *
 * @module  index
 * @author  smozingo
 * @date    28.May.2017
 * @description simply a place to combine reducers
 *
 * ************************************
 */

import { combineReducers } from 'redux';

// Reducers
import facecardsReducer from './facecardsReducer';
import cohortReducer from './cohortReducer';

// Combine reducers
const reducers = combineReducers({
  facecardsState: facecardsReducer,
  cohortState: cohortReducer,
});

export default reducers;

