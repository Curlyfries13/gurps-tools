import React from 'react';

import { RenderResult } from '@testing-library/react';
import Log from './Log';

import { render } from 'tools/test-utils';
import store from 'src/redux';

const mockState = { log: [] };

it('matches snapshot', async () => {
  const component: RenderResult = render(<Log />, { initialState: mockState });
  expect(component).toMatchSnapshot();
});
