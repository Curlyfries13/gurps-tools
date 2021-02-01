import { Armor, MoveDirection } from '/src/types';
import * as actionTypes from '../actions/actionTypes';
import { ArmorActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

export default function armorReducer(
  state = initialState.armorStack,
  action: ArmorActionTypes
) {
  switch (action.type) {
    case actionTypes.CREATE_ARMOR:
      return [...state, { ...action.armor }];
    case actionTypes.DELETE_ARMOR:
      return state.filter((armor: Armor) => armor.id !== action.armor.id);
    case actionTypes.UPDATE_ARMOR:
      return state.map((armor: Armor) => {
        return armor.id === action.armor.id ? action.armor : armor;
      });
    case actionTypes.MOVE_ARMOR:
      let pivot: Armor = state.find(
        (armor: Armor) => armor.id === action.armor.id
      );
      let target: Armor = pivot;

      if (action.direction === MoveDirection.UP) {
        // reduce pivot order and increase target (if valid)
        if (pivot.order === 0) {
          // invalid move, do nothing
          return state;
        } else {
          target = state.find(
            (armor: Armor) => armor.order + 1 === pivot.order
          );
          target.order += 1;
          pivot.order -= 1;
        }
      } else if (action.direction === MoveDirection.DOWN) {
        if (pivot.order === state.length - 1) {
          return state;
        } else {
          target = state.find(
            (armor: Armor) => armor.order - 1 === pivot.order
          );
          target.order -= 1;
          pivot.order += 1;
        }
      }
      let outState = state
        .map((armor: Armor) => {
          if (armor.id === pivot.id) {
            return pivot;
          } else if (armor.id === target.id) {
            return target;
          } else {
            return armor;
          }
        })
        .sort((a: Armor, b: Armor) => {
          return a.order - b.order;
        });
      return outState;
    default:
      return state;
  }
}
