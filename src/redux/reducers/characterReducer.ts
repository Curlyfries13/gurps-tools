import * as actionTypes from '../actions/actionTypes';
import { CharacterActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

export default function characterReducer(
  state = initialState,
  action: CharacterActionTypes
) {
  switch (action.type) {
    case actionTypes.UPDATE_DISPLAY_HP:
      return { ...state, displayHP: action.value };
    case actionTypes.UPDATE_HP:
      return { ...state, hp: action.value };
    case actionTypes.DAMAGE_HP:
      const outHP: number = state.currHp - action.value;
      return { ...state, currHp: outHP };
    default:
      return state;
  }
}
