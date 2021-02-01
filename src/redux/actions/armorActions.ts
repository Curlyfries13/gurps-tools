import { Armor, MoveDirection } from '../types';
import * as actionTypes from './actionTypes';
import { ArmorActionTypes } from './actionTypes';

export function addArmor(armor: Armor): ArmorActionTypes {
  return { type: actionTypes.CREATE_ARMOR, armor };
}

export function removeArmor(armor: Armor): ArmorActionTypes {
  return { type: actionTypes.DELETE_ARMOR, armor };
}

export function updateArmor(armor: Armor): ArmorActionTypes {
  return { type: actionTypes.UPDATE_ARMOR, armor };
}

export function moveArmor(
  armor: Armor,
  direction: MoveDirection
): ArmorActionTypes {
  return { type: actionTypes.MOVE_ARMOR, direction, armor };
}
