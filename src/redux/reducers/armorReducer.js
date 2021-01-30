import * as types from '../actions/actionTypes.js';
import initialState from './initialState';

export default function armorReducer(state = initialState.armorStack, action) {
  switch (action.type) {
    case types.CREATE_ARMOR:
      return [...state, { ...action.armor }];
    case types.DELETE_ARMOR:
      return state.filter((armor) => armor.id !== action.armor.id);
    case types.UPDATE_ARMOR:
      return state.map((armor) =>
        armor.id === action.armor.id ? action.armor : armor
      );
    default:
      return state;
  }
}
