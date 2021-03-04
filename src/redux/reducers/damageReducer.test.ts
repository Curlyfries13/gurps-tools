import damageReducer from './damageReducer';
import {
  DamageActionTypes,
  UPDATE_DAMAGE_EXPRESSION,
  UPDATE_EXPRESSION_VALID,
  UPDATE_DICE_MODE,
  SET_DAMAGE_TYPE,
} from '../actions/actionTypes';

import initialState from './initialState';

it('returns default state', () => {
  expect(damageReducer(undefined, {} as DamageActionTypes)).toEqual(
    initialState
  );
});

it('updates the damage expression', () => {
  expect(
    damageReducer(initialState, {
      type: UPDATE_DAMAGE_EXPRESSION,
      value: '3d6',
    })
  ).toEqual({ ...initialState, damageExpression: '3d6' });
});

it('updates the expression valid status', () => {
  expect(
    damageReducer(initialState, { type: UPDATE_EXPRESSION_VALID, value: false })
  ).toEqual({ ...initialState, expressionIsValid: false });
});

it('updates dice mode', () => {
  expect(
    damageReducer(initialState, { type: UPDATE_DICE_MODE, value: true })
  ).toEqual({ ...initialState, diceMode: true });
});

it('updates damage types', () => {
  expect(
    damageReducer(initialState, { type: SET_DAMAGE_TYPE, key: 'cut' })
  ).toEqual({ ...initialState, damageType: 'cut', damageMultiplier: 1.5 });
});
