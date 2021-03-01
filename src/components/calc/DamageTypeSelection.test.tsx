import React from 'react';
import { RenderResult } from '@testing-library/react';
import { render } from 'tools/test-utils';

import DamageTypeSelection from './DamageTypeSelection';

it('matches snapshot', async () => {
  const component: RenderResult = render(<DamageTypeSelection />);
  expect(component).toMatchSnapshot();
});
