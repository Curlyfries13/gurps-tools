import React from 'react';
import { RenderResult } from '@testing-library/react';
import { render } from 'tools/test-utils';

import SummaryDR from './SummaryDR';

const mockState = { armorStack: [] };

it('matches snapshot', async () => {
  const component: RenderResult = render(<SummaryDR propDR={0} />, {
    initialState: mockState,
  });
  expect(component).toMatchSnapshot();
});
