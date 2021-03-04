import characterReducer from './characterReducer';
import {
  CharacterActionTypes,
  DAMAGE_HP,
  RESET_HP,
  UPDATE_HP,
  UPDATE_CURR_HP,
  UPDATE_DISPLAY_CURR_HP,
  UPDATE_DISPLAY_HP,
} from '../actions/actionTypes';

import initialState from './initialState';

const dirtyState = {
  ...initialState,
  displayHP: '10',
  hp: 10,
  currHp: 8,
  displayCurrHP: '8',
};

it('returns default state', () => {
  expect(characterReducer(undefined, {} as CharacterActionTypes)).toEqual(
    initialState
  );
});

it('updates display HP', () => {
  expect(
    characterReducer(initialState, { type: UPDATE_DISPLAY_HP, value: '12' })
  ).toEqual({ ...initialState, displayHP: '12' });
});

it('updates display current HP', () => {
  expect(
    characterReducer(initialState, {
      type: UPDATE_DISPLAY_CURR_HP,
      value: '12',
    })
  ).toEqual({ ...initialState, displayCurrHP: '12' });
});

it('Damages HP', () => {
  expect(characterReducer(dirtyState, { type: DAMAGE_HP, value: 2 })).toEqual({
    ...dirtyState,
    currHp: 6,
    displayCurrHP: '6',
  });
});

it('updates current HP', () => {
  expect(
    characterReducer(initialState, {
      type: UPDATE_CURR_HP,
      value: 12,
    })
  ).toEqual({ ...initialState, currHp: 12, displayCurrHP: '12' });
});

it('updates total HP', () => {
  expect(
    characterReducer(initialState, {
      type: UPDATE_HP,
      value: 12,
    })
  ).toEqual({ ...initialState, hp: 12 });
});

it('resets HP', () => {
  expect(characterReducer(dirtyState, { type: RESET_HP })).toEqual({
    ...dirtyState,
    currHp: 10,
    displayCurrHP: 10,
  });
});
