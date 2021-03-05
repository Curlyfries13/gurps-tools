import { Armor } from 'src/types';

import store from 'src/redux';
import * as actionTypes from './actionTypes';
import { LogActionTypes } from './actionTypes';

export function LogRollAction(
  roll: string,
  result: number,
  values: number[],
  maxValue: number
): LogActionTypes {
  let out_string: string = '';
  const isMaxDamage = values.reduce((acc: boolean, value: number) => {
    return acc && value == maxValue;
  }, true);
  out_string += `${roll} ` + '[' + values.join(', ') + ']';
  if (isMaxDamage) {
    out_string += ' (Max Damage!)';
  }
  out_string += ` ${result} damage:`;
  return { type: actionTypes.APPEND_LOG_ENTRY, message: out_string };
}

export function LogArmorDamage(
  target: Armor,
  value: number,
  blowThrough: number
): LogActionTypes {
  let out_string: string = '';
  if (blowThrough > 0) {
    let block: number = value - blowThrough;
    out_string += `${target.name} blocks ${block} damage, ${blowThrough} breaks throguh.`;
  } else {
    out_string += `${target.name} blocks ${value} damage.`;
  }
  return { type: actionTypes.APPEND_LOG_ENTRY, message: out_string };
}

export function LogArmorAblateAction(armor: Armor, value: number) {
  if (value > 0) {
    const outString = `${armor.name} ablates, losing ${value} DR.`;
    return { type: actionTypes.APPEND_LOG_ENTRY, message: outString };
  }
}

export function LogHealthDamageAction(value: number): LogActionTypes {
  const maxHP = store.getState().hp;
  const currentHP = store.getState().currHp;
  const deathThreshold: number = maxHP * -5;
  const goneThreshold: number = maxHP * -10;

  let out_string: string = `takes ${value} damage. ${currentHP} / ${maxHP}.`;

  if (currentHP <= deathThreshold) {
    out_string += ` dead...`;
  }
  if (currentHP <= goneThreshold) {
    out_string += ` nothing left.`;
  }
  return { type: actionTypes.APPEND_LOG_ENTRY, message: out_string };
}

export function LogNoDamageTaken(): LogActionTypes {
  let outString: string = `no damage taken.`;
  return { type: actionTypes.APPEND_LOG_ENTRY, message: outString };
}

export function LogEntryAction(): LogActionTypes {
  return { type: actionTypes.COMMIT_LOG_ENTRY };
}
