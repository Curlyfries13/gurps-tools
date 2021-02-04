import store from '/src/redux';

import * as actionTypes from './actionTypes';
import { DamageActionTypes } from './actionTypes';

import { basicPattern as pattern } from '/src/utils/diceUtils';
import { ensureFound, getRandomInt } from '/src/utils/jsUtils';

// call this with a dice expression
export function rollDamage(value: string): DamageActionTypes {
  const match = ensureFound<RegExpMatchArray>(value.match(pattern));
  const [, mult, sides, mod] = match;
  if (match === null) {
    // invalid dice format, do nothing
    debugger;
    return { type: actionTypes.ROLL_DAMAGE };
  }
  let multNum, sidesNum, modNum;

  if (mult) {
    multNum = parseInt(mult, 10);
  } else multNum = 1;
  if (sides) {
    sidesNum = parseInt(sides, 10);
  } else sidesNum = 6;
  if (mod) {
    // TODO: issue on +/-
    modNum = parseInt(mod, 10);
  } else modNum = 0;

  // could start with mod...
  let out = 0;

  for (; multNum > 0; multNum--) {
    out += getRandomInt(sidesNum + 1);
  }
  out += modNum;

  store.dispatch({ type: actionTypes.APPLY_DAMAGE, value: out });
  return { type: actionTypes.ROLL_DAMAGE };
}

export function applyDamage(value: number): DamageActionTypes {
  return { type: actionTypes.APPLY_DAMAGE, value };
}

export function setValidExpression(value: boolean): DamageActionTypes {
  return { type: actionTypes.UPDATE_EXPRESSION_VALID, value };
}

export function setExpression(value: string): DamageActionTypes {
  return { type: actionTypes.UPDATE_DAMAGE_EXPRESSION, value };
}

export function setDiceMode(value: boolean): DamageActionTypes {
  return { type: actionTypes.UPDATE_DICE_MODE, value };
}
