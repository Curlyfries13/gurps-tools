import * as actionTypes from '../actions/actionTypes';
import { DamageActionTypes } from '../actions/actionTypes';
import initialState from './initialState';
import { Armor } from '/src/types';

export default function damageReducer(
  state = initialState,
  action: DamageActionTypes
) {
  switch (action.type) {
    case actionTypes.APPLY_DAMAGE:
      // main damage logic
      let damage = action.value;
      let outHp = state.currHp;
      state.armorStack
        .sort((a: Armor, b: Armor) => a.order - b.order)
        .forEach((armor: Armor) => {
          if (damage > armor.dr) {
            damage = damage - armor.dr;
          } else {
            damage = 0;
          }
        });
      if (damage > 0) {
        outHp -= damage;
      }
      return { ...state, currHp: outHp, displayCurrHP: outHp };
    case actionTypes.UPDATE_DAMAGE_EXPRESSION:
      return { ...state, damageExpression: action.value };
    case actionTypes.UPDATE_EXPRESSION_VALID:
      return { ...state, expressionIsValid: action.value };
    case actionTypes.UPDATE_DICE_MODE:
      return { ...state, diceMode: action.value };
    default:
      return state;
  }
}
