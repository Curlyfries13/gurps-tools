import armorReducer from './armorReducer';
import {
  CREATE_ARMOR,
  DELETE_ARMOR,
  DAMAGE_DR,
  MOVE_ARMOR,
  ArmorActionTypes,
} from '../actions/actionTypes';

import { Armor, MoveDirection } from 'src/types';
import initialState from './initialState';

// TODO: we may want to move this out to somewhere more central
const defaultArmor: Armor = {
  id: 0,
  order: 0,
  name: 'Armor',
  dr: 0,
  maxDR: 0,
  ablative: false,
  ablateBase: 10,
  vulnerabilities: [],
};

const secondArmor: Armor = {
  ...defaultArmor,
  id: 1,
  order: 1,
  name: 'Armor 2',
};

const ablativeArmor: Armor = {
  ...defaultArmor,
  dr: 10,
  maxDR: 10,
  ablative: true,
  ablateBase: 10,
};

const stateWithArmor = { ...initialState, armorStack: [defaultArmor] };
const stateWithTwoArmor = {
  ...stateWithArmor,
  armorStack: [defaultArmor, secondArmor],
};

const stateWithAblativeArmor = { ...initialState, armorStack: [ablativeArmor] };

it('returns default state', () => {
  expect(armorReducer(undefined, {} as ArmorActionTypes)).toEqual(initialState);
});

it('adds armor to the stack on CREATE_ARMOR', () => {
  expect(
    armorReducer(undefined, { type: CREATE_ARMOR, armor: defaultArmor })
  ).toEqual({ ...initialState, armorStack: [defaultArmor] });
});

it('removes armor from the stack on DELETE_ARMOR', () => {
  expect(
    armorReducer(stateWithArmor, { type: DELETE_ARMOR, armor: defaultArmor })
  ).toEqual(initialState);
});

it('moves armors', () => {
  expect(
    armorReducer(stateWithTwoArmor, {
      type: MOVE_ARMOR,
      armor: defaultArmor,
      direction: MoveDirection.DOWN,
    })
  ).toEqual({
    ...initialState,
    armorStack: [
      { ...secondArmor, order: 0 },
      { ...defaultArmor, order: 1 },
    ],
  });
});

it('damages armor', () => {
  expect(
    armorReducer(stateWithAblativeArmor, {
      type: DAMAGE_DR,
      armor: ablativeArmor,
      value: 2,
    })
  ).toEqual({
    ...stateWithAblativeArmor,
    armorStack: [{ ...ablativeArmor, dr: 8 }],
  });
});
