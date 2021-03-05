import store from 'src/redux';

import * as actionTypes from './actionTypes';
import { DamageActionTypes } from './actionTypes';

import {
  LogArmorAblateAction,
  LogArmorDamage,
  LogEntryAction,
  LogHealthDamageAction,
  LogRollAction,
  LogNoDamageTaken,
} from './logActions';
import { damageDR } from './armorActions';
import { damageHP } from './characterActions';

import { basicPattern as pattern } from 'src/utils/diceUtils';
import { ensureFound, getRandomInt } from 'src/utils/jsUtils';
import { Armor, DamageTypes, DamageTypesCollection } from 'src/types';

// call this with a dice expression
export function rollDamage(
  value: string,
  damageType: string
): DamageActionTypes | void {
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

  store.dispatch(applyDamage(out, damageType));
  return { type: actionTypes.ROLL_DAMAGE, roll: results };
}

// main damage logic
export function applyDamage(
  damage: number,
  damageType: string = 'cr'
): DamageActionTypes {
  // B378, check for negative modifiers
  // NOTE this may get tricky if we allow custom damage types which have 0
  // minumums.
  if (damageType == 'cr' && damage < 0) {
    damage = 0;
  } else if (damage < 0) {
    damage = 1;
  }

  store
    .getState()
    .armorStack.sort((a: Armor, b: Armor) => a.order - b.order)
    .forEach((armor: Armor) => {
      if (damage > 0) {
        damage = calculateArmorDamage(damage, armor);
      }
    });
  if (damage > 0) {
    const mult = DamageTypes[damageType as keyof DamageTypesCollection].mult;
    const penDamage = Math.floor(damage * mult);
    store.dispatch(damageHP(penDamage));
    store.dispatch(LogHealthDamageAction(penDamage));
  } else {
    store.dispatch(LogNoDamageTaken());
  }
  store.dispatch(LogEntryAction());
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

export function setDamageType(key: string): DamageActionTypes {
  return { type: actionTypes.SET_DAMAGE_TYPE, key };
}

// Helper functions

// Apply damage to a piece of armor. Return blowthrough
// Dispatches 'Damage Armor', 'Log Armor Damage' actions
function calculateArmorDamage(damage: number, armor: Armor): number {
  let blowthrough = damage - armor.dr;
  if (armor.ablative) {
    // TODO: implement armor divisor math options.
    let ablate = Math.floor(damage / armor.ablateBase);
    store.dispatch(damageDR(armor, ablate));
    store.dispatch(LogArmorAblateAction(armor, ablate));
  }
  if (blowthrough > 0) {
    store.dispatch(LogArmorDamage(armor, damage, blowthrough));
  }

  return blowthrough < 0 ? 0 : blowthrough;
}
