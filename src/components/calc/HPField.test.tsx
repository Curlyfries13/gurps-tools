import React from 'react';

import { RenderResult } from '@testing-library/react';
import HPField from './HPField';

import { render, fireEvent, waitFor, screen } from 'tools/test-utils';
import store from 'src/redux';

const mockState = {
  hp: 0,
  currHP: 0,
};

it('matches snapshot', async () => {
  const component: RenderResult = render(<HPField />, {
    initialState: mockState,
  });
  expect(component).toMatchSnapshot();
});

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

it('gives error messages on invalid total HP', async () => {
  render(<HPField />, {
    initialState: mockState,
    store: store,
  });
  fireEvent.change(screen.getByLabelText(/total hit points/i), {
    target: { value: 'a' },
  });
  const test = await screen.findByText(/Total HP must be a positive number/i);
  expect(test).not.toBe(null);
});

it('gives error messages on negative total HP', async () => {
  render(<HPField />, {
    initialState: mockState,
    store: store,
  });
  fireEvent.change(screen.getByLabelText(/total hit points/i), {
    target: { value: '-10' },
  });
  const test = await screen.findByText(/Total HP must be a positive number/i);
  expect(test).not.toBe(null);
});

it('gives an error message on invalid current HP', async () => {
  render(<HPField />, {
    initialState: mockState,
    store: store,
  });
  fireEvent.change(screen.getByLabelText(/current hit points/i), {
    target: { value: 'a' },
  });
  const test = await screen.findByText(/Current HP must be a number/i);
  expect(test).not.toBe(null);
});
