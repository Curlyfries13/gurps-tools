import * as types from './actionTypes';

export function addArmor(armor) {
  return { type: types.CREATE_ARMOR, armor };
}

export function removeArmor(armor) {
  return { type: types.DELETE_ARMOR, armor };
}

export function updateArmor(armor) {
  return { type: types.UPDATE_ARMOR, id };
}
