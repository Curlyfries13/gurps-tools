import React from 'react';

import { RenderResult } from '@testing-library/react';
import HPField from './HPField';

import { render, fireEvent, waitFor, screen } from 'tools/test-utils';
import store from 'src/redux';

const mockState = {
  hp: 0,
  currHP: 0,
};

it('updates the current HP to the total HP ', async () => {
  render(<HPField />, {
    initialState: mockState,
    store: store,
  });
  fireEvent.change(screen.getByLabelText(/total hit points/i), {
    target: { value: '10' },
  });
  const test = screen.getByLabelText(/current hit points/i);
  expect(test.value).toBe('10');
});
