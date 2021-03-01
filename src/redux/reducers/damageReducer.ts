import * as actionTypes from '../actions/actionTypes';
import { DamageActionTypes } from '../actions/actionTypes';
import initialState from './initialState';
import { Armor, DamageTypes, DamageTypeCollection } from 'src/types';

// TODO: break this out from the reducer
export default function damageReducer(
  state = initialState,
  action: DamageActionTypes
) {
  switch (action.type) {
    case actionTypes.UPDATE_DAMAGE_EXPRESSION:
      return { ...state, damageExpression: action.value };
    case actionTypes.UPDATE_EXPRESSION_VALID:
      return { ...state, expressionIsValid: action.value };
    case actionTypes.UPDATE_DICE_MODE:
      return { ...state, diceMode: action.value };
    case actionTypes.SET_DAMAGE_TYPE:
      let key: string = action.key;
      return {
        ...state,
        damageType: action.key,
        damageMultiplier: DamageTypes[key as keyof DamageTypes].mult || 1,
      };
    default:
      return state;
  }
}
