import { Armor, MoveDirection } from '/src/types';
import * as actionTypes from '../actions/actionTypes';
import { ArmorActionTypes } from '../actions/actionTypes';
import initialState from './initialState';
import { ensureFound } from '/src/utils/jsUtils';

export default function armorReducer(
  state = initialState,
  action: ArmorActionTypes
) {
  switch (action.type) {
    case actionTypes.CREATE_ARMOR:
      const armorStack = [...state.armorStack, action.armor];
      return { ...state, armorStack: armorStack };
    case actionTypes.DELETE_ARMOR:
      return {
        ...state,
        armorStack: state.armorStack.filter(
          (armor: Armor) => armor.id !== action.armor.id
        ),
      };
    case actionTypes.UPDATE_ARMOR:
      return {
        ...state,
        armorStack: state.armorStack.map((armor: Armor) => {
          return armor.id === action.armor.id ? action.armor : armor;
        }),
      };
    case actionTypes.MOVE_ARMOR:
      // TODO: wrap up ensureFounds in try catch blocks
      let pivot: Armor = ensureFound<Armor>(
        state.armorStack.find((armor: Armor) => {
          return armor.id === action.armor.id;
        })
      );
      // this is where the Armor moves onto: this will need to go to the pivot's
      // original location
      let target: Armor = pivot;
      if (action.direction === MoveDirection.UP) {
        // reduce pivot order and increase target (if valid)
        if (pivot.order === 0) {
          // invalid move, do nothing
          return state;
        } else {
          target = ensureFound<Armor>(
            state.armorStack.find(
              (armor: Armor) => armor.order + 1 === pivot.order
            )
          );
        }
      } else if (action.direction === MoveDirection.DOWN) {
        if (pivot.order === state.armorStack.length - 1) {
          return state;
        } else {
          target = ensureFound<Armor>(
            state.armorStack.find(
              (armor: Armor) => armor.order - 1 === pivot.order
            )
          );
        }
      }

      let outState = state.armorStack
        .map((armor: Armor) => {
          if (armor.id === pivot.id) {
            return { ...pivot, order: target.order };
          } else if (armor.id === target.id) {
            return { ...target, order: pivot.order };
          } else {
            return armor;
          }
        })
        .sort((a: Armor, b: Armor) => {
          return a.order - b.order;
        });
      return { ...state, armorStack: outState };
    default:
      return state;
  }
}
