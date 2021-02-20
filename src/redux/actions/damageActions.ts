import store from 'src/redux';

import * as actionTypes from './actionTypes';
import { DamageActionTypes } from './actionTypes';
import {
  LogRollAction,
  LogArmorDamage,
  LogHealthDamageAction,
  LogEntryAction,
} from './logActions';
import { damageHP } from './characterActions';

import { basicPattern as pattern } from 'src/utils/diceUtils';
import { ensureFound, getRandomInt } from 'src/utils/jsUtils';
import { Armor } from 'src/types';

// call this with a dice expression
export function rollDamage(value: string): DamageActionTypes | void {
  const match = ensureFound<RegExpMatchArray>(value.match(pattern));
  const [, mult, sides, mod] = match;
  if (match === null) {
    // invalid dice format, do nothing
    return;
  }
  let multNum, sidesNum, modNum;
  let results: number[] = [];

  if (mult) {
    multNum = parseInt(mult, 10);
  } else multNum = 1;
  if (sides) {
    sidesNum = parseInt(sides, 10);
  } else sidesNum = 6;
  if (mod && mod[0] === '+') {
    modNum = parseInt(mod.slice(1), 10);
  } else if (mod && mod[0] === '-') {
    modNum = parseInt(mod.slice(1), 10) * -1;
  } else modNum = 0;

  // could start with mod...
  // Main dice rolling logic
  let out = 0;

  for (; multNum > 0; multNum--) {
    let result = getRandomInt(sidesNum) + 1;
    out += result;
    results.push(result);
  }
  out += modNum;
  store.dispatch(LogRollAction(value, out, results, sidesNum));

  store.dispatch(applyDamage(out));
  store.dispatch(LogEntryAction());
  return { type: actionTypes.ROLL_DAMAGE, roll: results };
}

export function applyDamage(damage: number): DamageActionTypes {
  // main damage logic
  store
    .getState()
    .armorStack.sort((a: Armor, b: Armor) => a.order - b.order)
    .forEach((armor: Armor) => {
      if (damage > armor.dr) {
        let blowthrough = damage - armor.dr;
        store.dispatch(LogArmorDamage(armor, damage, blowthrough));
        damage = blowthrough;
      } else {
        store.dispatch(LogArmorDamage(armor, damage, 0));
        damage = 0;
      }
    });
  if (damage > 0) {
    store.dispatch(damageHP(damage));
    store.dispatch(LogHealthDamageAction(damage));
  }
  return { type: actionTypes.APPLY_DAMAGE, value: damage };
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
