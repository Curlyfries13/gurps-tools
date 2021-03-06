import store from 'src/redux';
import * as actionTypes from './actionTypes';
import { CharacterActionTypes } from './actionTypes';
import { numberPattern } from 'src/utils/jsUtils';

export function updateHP(value: number): CharacterActionTypes {
  return { type: actionTypes.UPDATE_HP, value: value };
}

export function updateCurrentHP(value: number): CharacterActionTypes {
  return { type: actionTypes.UPDATE_CURR_HP, value: value };
}

export function damageHP(value: number): CharacterActionTypes {
  // TODO: if adding shock, critical injuries etc. add extra action calls here
  return { type: actionTypes.DAMAGE_HP, value };
}

export function resetHP(): CharacterActionTypes {
  return { type: actionTypes.RESET_HP };
}
