import store from '/src/redux';
import * as actionTypes from './actionTypes';
import { CharacterActionTypes } from './actionTypes';
import { numberPattern } from '/src/utils/jsUtils';

export function updateDisplayHP(value: string): CharacterActionTypes {
  if (value && value.match(numberPattern) !== null) {
    const parseValue: number = parseInt(value, 10);
    store.dispatch({ type: actionTypes.UPDATE_HP, value: parseValue });
  }
  return { type: actionTypes.UPDATE_DISPLAY_HP, value };
}

export function damageHP(value: number): CharacterActionTypes {
  // TODO: if adding shpck, critical injuries etc. add extra action calls here
  return { type: actionTypes.DAMAGE_HP, value };
}
