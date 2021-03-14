import React from 'react';

import { RenderResult } from '@testing-library/react';
import DRField from './DRField';

import { render, fireEvent, screen } from 'tools/test-utils';
import store from 'src/redux';

const mockArmor = { dr: 0, id: 0 };
const mockState = { armorStack: [mockArmor] };

it('matches snapshot', async () => {
  const component: RenderResult = render(<DRField armorId={0} />, {
    initialState: mockState,
  });
  expect(component).toMatchSnapshot();
});

it('displays an error message on invalid DR', async () => {
  const component: RenderResult = render(<DRField armorId={0} />, {
    initialState: mockState,
  });
  fireEvent.change(screen.getByLabelText(/Max Damage Resistence/i), {
    target: { value: 'a' },
  });
  const test = await screen.findByText(
    /DR must be a non-negative number/i,
    {},
    { timeout: 1500 }
  );
  expect(test).not.toBe(null);
});
