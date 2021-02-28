import React from 'react';
import { RenderResult } from '@testing-library/react';
import { render } from 'tools/test-utils';

import DamageTray from './DamageTray';

it('matches snapshot', async () => {
  const component: RenderResult = render(<DamageTray />);
  expect(component).toMatchSnapshot();
});
