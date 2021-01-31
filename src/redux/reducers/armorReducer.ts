import { Armor } from '../types';
import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function armorReducer(state = initialState.armorStack, action) {
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
