import { combineReducers } from 'redux';
import armor from './armorReducer';

const rootReducer = combineReducers({
  armorStack: armor,
});

export default rootReducer;
