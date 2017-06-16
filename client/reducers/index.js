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
import cpcReducer from './cpcReducer';
import addEditReducer from './addEditReducer';

// Combine reducers
const reducers = combineReducers({
  facecardsState: facecardsReducer,
  cpcState: cpcReducer,
  addEditState: addEditReducer,
});

export default reducers;

