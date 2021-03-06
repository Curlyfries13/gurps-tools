import characterReducer from './characterReducer';
import {
  CharacterActionTypes,
  DAMAGE_HP,
  RESET_HP,
  UPDATE_HP,
  UPDATE_CURR_HP,
} from '../actions/actionTypes';

import initialState from './initialState';

const dirtyState = {
  ...initialState,
  hp: 10,
  currHp: 8,
};

it('returns default state', () => {
  expect(characterReducer(undefined, {} as CharacterActionTypes)).toEqual(
    initialState
  );
});

it('Damages HP', () => {
  expect(characterReducer(dirtyState, { type: DAMAGE_HP, value: 2 })).toEqual({
    ...dirtyState,
    currHp: 6,
  });
});

it('updates current HP', () => {
  expect(
    characterReducer(initialState, {
      type: UPDATE_CURR_HP,
      value: 12,
    })
  ).toEqual({ ...initialState, currHp: 12 });
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
  });
});
