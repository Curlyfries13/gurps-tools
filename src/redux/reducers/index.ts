import { combineReducers } from 'redux';
import armor from './armorReducer';
import damage from './damageReducer';

// TODO restructure state to be organized: armor, damage etc.
const rootReducer = combineReducers({
  armorStack: armor,
  damage: damage,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
