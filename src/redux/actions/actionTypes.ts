import { Armor } from '../types';

export const CREATE_ARMOR = 'CREATE_ARMOR';
export const UPDATE_ARMOR = 'UPDATE_ARMOR';
export const DELETE_ARMOR = 'DELETE_ARMOR';
export const UPDATE_DR = 'UPDATE_DR';
export const DAMAGE_DR = 'DAMAGE_DR';

export const UPDATE_HP = 'UPDATE_HP';
export const DAMAGE_HP = 'DAMAGE_HP';

interface CreateArmorAction {
  type: typeof CREATE_ARMOR
  armor: Armor
}

interface DeleteArmorAction {
  type: typeof DELETE_ARMOR
  armor: Armor
}

interface UpdateArmorAction {
  type: typeof UPDATE_ARMOR
  armor: Armor
}

interface UpdateDRAction {
  type: typeof UPDATE_DR
  armor: Armor
  value: number
}

interface DamageDRAction {
  type: typeof DAMAGE_DR
  armor: Armor
  value: number
}

export type ArmorActionTypes = CreateArmorAction | DeleteArmorAction | UpdateArmorAction;
