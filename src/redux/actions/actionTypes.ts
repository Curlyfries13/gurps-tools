import { Armor, MoveDirection } from 'src/types';

export const CREATE_ARMOR = 'CREATE_ARMOR';
export const UPDATE_ARMOR = 'UPDATE_ARMOR';
export const DELETE_ARMOR = 'DELETE_ARMOR';
export const MOVE_ARMOR = 'MOVE_ARMOR';
export const UPDATE_DR = 'UPDATE_DR';
export const DAMAGE_DR = 'DAMAGE_DR';

export const UPDATE_DISPLAY_HP = 'UPDATE_DISPLAY_HP';
export const UPDATE_DISPLAY_CURR_HP = 'UPDATE_DISPLAY_CURR_HP';
export const UPDATE_HP = 'UPDATE_HP';
export const UPDATE_CURR_HP = 'UPDATE_CURR_HP';
export const DAMAGE_HP = 'DAMAGE_HP';
export const RESET_HP = 'RESET_HP';

export const APPEND_LOG_ENTRY = 'APPEND_LOG_ENTRY';
export const COMMIT_LOG_ENTRY = 'LOG_ENTRY';

// may want to split out into dice actions
export const UPDATE_DAMAGE_EXPRESSION = 'UPDATE_DAMAGE_EXPRESSION';
export const UPDATE_EXPRESSION_VALID = 'UPDATE_EXPRESSION_VALID';
export const UPDATE_DICE_MODE = 'UPDATE_DICE_MODE';
export const SET_DAMAGE_TYPE = 'SET_DAMAGE_TYPE';

// status only actions
export const ROLL_DAMAGE = 'ROLL_DAMAGE';
export const APPLY_DAMAGE = 'APPLY_DAMAGE';

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

interface UpdateDisplayCurrentHPAction {
  type: typeof UPDATE_DISPLAY_CURR_HP;
  value: string;
}

interface UpdateHPAction {
  type: typeof UPDATE_HP;
  value: number;
}

interface UpdateCurrHP {
  type: typeof UPDATE_CURR_HP;
  value: number;
}

interface DamageHPAction {
  type: typeof DAMAGE_HP;
  value: number;
  mult: number;
}

interface ResetHPAction {
  type: typeof RESET_HP;
}

interface AppendLogEntryAction {
  type: typeof APPEND_LOG_ENTRY;
  message: string;
}

interface CommitLogEntryAction {
  type: typeof COMMIT_LOG_ENTRY;
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

interface SetDamageType {
  type: typeof SET_DAMAGE_TYPE;
  key: string;
}

interface RollDamageAction {
  type: typeof ROLL_DAMAGE;
  roll: number[];
}

interface ApplyDamageAction {
  type: typeof APPLY_DAMAGE;
  value: number;
}

export type ArmorActionTypes =
  | CreateArmorAction
  | DeleteArmorAction
  | UpdateArmorAction
  | MoveArmorAction;

export type DamageActionTypes =
  | ApplyDamageAction
  | UpdateDamageExpressionAction
  | UpdateExpressionValidAction
  | UpdateDiceModeAction
  | RollDamageAction
  | ApplyDamageAction
  | SetDamageType;

export type CharacterActionTypes =
  | UpdateDisplayHPAction
  | UpdateHPAction
  | DamageHPAction
  | UpdateDisplayCurrentHPAction
  | UpdateCurrHP
  | ResetHPAction;

export type LogActionTypes = AppendLogEntryAction | CommitLogEntryAction;
