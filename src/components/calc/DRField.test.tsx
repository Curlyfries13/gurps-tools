import React from 'react';

import { RenderResult } from '@testing-library/react';
import DRField from './DRField';

import { render } from 'tools/test-utils';
import store from 'src/redux';

const mockArmor = { dr: 0, id: 0 };
const mockState = { armorStack: [mockArmor] };

it('matches snapshot', async () => {
  const component: RenderResult = render(<DRField armorId={0} />, {
    initialState: mockState,
  });
  expect(component).toMatchSnapshot();
});
