import React from 'react';

import { RenderResult } from '@testing-library/react';
import CalcForm from './CalcForm';

import { render } from 'tools/test-utils';
import store from 'src/redux';

const mockState = {
  armorStack: [],
  displayHP: '0',
  hp: 0,
  displayCurrHP: '0',
  currHp: 0,
  diceMode: false,
  damageExpression: '0',
  expressionIsValid: true,
  log: [],
  currentLogEntry: '',
};

it('matches snapshot', async () => {
  const component: RenderResult = render(<CalcForm />, {
    initialState: mockState,
    store: store,
  });
  expect(component).toMatchSnapshot();
});
