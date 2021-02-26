import reduceReducers from 'reduce-reducers';
import initialState from './initialState';
import armor from './armorReducer';
import damage from './damageReducer';
import character from './characterReducer';
import log from './logReducer';

// TODO: see if we can clean up the typescript typing errors here.
export const createReducer = (state: typeof initialState) => {
  return reduceReducers(state, armor, damage, character, log);
};

const rootReducer = createReducer(initialState);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
