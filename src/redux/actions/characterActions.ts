import store from 'src/redux';
import * as actionTypes from './actionTypes';
import { CharacterActionTypes } from './actionTypes';
import { numberPattern } from 'src/utils/jsUtils';

export function updateDisplayHP(value: string): CharacterActionTypes {
  if (value && value.match(numberPattern) !== null) {
    const parseValue: number = parseInt(value, 10);
    store.dispatch({ type: actionTypes.UPDATE_HP, value: parseValue });
    // TODO: if we're currently in a simulation mode we may not want to delete
    // everything
    store.dispatch({ type: actionTypes.RESET_HP });
  }
  return { type: actionTypes.UPDATE_DISPLAY_HP, value };
}

export function damageHP(
  value: number,
  mult: number = 1.0
): CharacterActionTypes {
  // TODO: if adding shock, critical injuries etc. add extra action calls here
  return { type: actionTypes.DAMAGE_HP, value, mult };
}

export function updateDisplayCurrHP(value: string): CharacterActionTypes {
  if (value && value.match(numberPattern) !== null) {
    const parseValue: number = parseInt(value, 10);
    store.dispatch({ type: actionTypes.UPDATE_CURR_HP, value: parseValue });
  }
  return { type: actionTypes.UPDATE_DISPLAY_CURR_HP, value };
}

export function resetHP(): CharacterActionTypes {
  return { type: actionTypes.RESET_HP };
}
