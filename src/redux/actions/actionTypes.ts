import { Armor, MoveDirection } from 'src/types';

export const CREATE_ARMOR = 'CREATE_ARMOR';
export const UPDATE_ARMOR = 'UPDATE_ARMOR';
export const DELETE_ARMOR = 'DELETE_ARMOR';
export const MOVE_ARMOR = 'MOVE_ARMOR';
export const UPDATE_DR = 'UPDATE_DR';
export const DAMAGE_DR = 'DAMAGE_DR';

export const UPDATE_DISPLAY_HP = 'UPDATE_DISPLAY_HP';
export const UPDATE_HP = 'UPDATE_HP';
export const DAMAGE_HP = 'DAMAGE_HP';

export const ROLL_DAMAGE = 'ROLL_DAMAGE';
export const APPLY_DAMAGE = 'APPLY_DAMAGE';
// may want to split out into dice actions
export const UPDATE_DAMAGE_EXPRESSION = 'UPDATE_DAMAGE_EXPRESSION';
export const UPDATE_EXPRESSION_VALID = 'UPDATE_EXPRESSION_VALID';
export const UPDATE_DICE_MODE = 'UPDATE_DICE_MODE';

interface CreateArmorAction {
  type: typeof CREATE_ARMOR;
  armor: Armor;
}

interface DeleteArmorAction {
  type: typeof DELETE_ARMOR;
  armor: Armor;
}

interface UpdateArmorAction {
  type: typeof UPDATE_ARMOR;
  armor: Armor;
}

interface MoveArmorAction {
  type: typeof MOVE_ARMOR;
  armor: Armor;
  direction: MoveDirection;
}

interface UpdateDRAction {
  type: typeof UPDATE_DR;
  armor: Armor;
  value: number;
}

interface DamageDRAction {
  type: typeof DAMAGE_DR;
  armor: Armor;
  value: number;
}

interface UpdateDisplayHPAction {
  type: typeof UPDATE_DISPLAY_HP;
  value: string;
}

interface UpdateHPAction {
  type: typeof UPDATE_HP;
  value: number;
}

interface DamageHPAction {
  type: typeof DAMAGE_HP;
  value: number;
}

interface RollDamageAction {
  type: typeof ROLL_DAMAGE;
}

interface ApplyDamageAction {
  type: typeof APPLY_DAMAGE;
  value: number;
}

interface UpdateDamageExpressionAction {
  type: typeof UPDATE_DAMAGE_EXPRESSION;
  value: string;
}

interface UpdateExpressionValidAction {
  type: typeof UPDATE_EXPRESSION_VALID;
  value: boolean;
}

interface UpdateDiceModeAction {
  type: typeof UPDATE_DICE_MODE;
  value: boolean;
}

export type ArmorActionTypes =
  | CreateArmorAction
  | DeleteArmorAction
  | UpdateArmorAction
  | MoveArmorAction;

export type DamageActionTypes =
  | RollDamageAction
  | ApplyDamageAction
  | UpdateDamageExpressionAction
  | UpdateExpressionValidAction
  | UpdateDiceModeAction;

export type CharacterActionTypes =
  | UpdateDisplayHPAction
  | UpdateHPAction
  | DamageHPAction;
