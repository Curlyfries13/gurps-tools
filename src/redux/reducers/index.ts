import { combineReducers } from 'redux';
import armor from './armorReducer';

const rootReducer = combineReducers({
  armorStack: armor,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
