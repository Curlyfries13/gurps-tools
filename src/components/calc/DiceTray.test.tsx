import React from 'react';

import { RenderResult } from '@testing-library/react';
import DiceTray from './DiceTray';

import { render, fireEvent, waitFor, screen } from 'tools/test-utils';
import store from 'src/redux';

it('matches snapshot', async () => {
  const component: RenderResult = render(<DiceTray />);
  expect(component).toMatchSnapshot();
});
