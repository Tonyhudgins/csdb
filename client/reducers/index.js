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
import cpcReducer from './cpcReducer';
import tabNavReducer from './tabNavReducer';

// Combine reducers
const reducers = combineReducers({
  cpcState: cpcReducer,
  tabNavState: tabNavReducer,
});

export default reducers;

