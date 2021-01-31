import { Armor } from '/src/types';
import * as actionTypes from '../actions/actionTypes';
import { ArmorActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

export default function armorReducer(state = initialState.armorStack, action: ArmorActionTypes) {
  switch (action.type) {
    case actionTypes.CREATE_ARMOR:
      return [...state, { ...action.armor }];
    case actionTypes.DELETE_ARMOR:
      return state.filter((armor: Armor) => armor.id !== action.armor.id);
    case actionTypes.UPDATE_ARMOR:
      return state.map((armor: Armor) =>
        armor.id === action.armor.id ? action.armor : armor
      );
    default:
      return state;
  }
}
