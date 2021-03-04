import logReducer from './logReducer';

import {
  LogActionTypes,
  APPEND_LOG_ENTRY,
  COMMIT_LOG_ENTRY,
} from '../actions/actionTypes';

import initialState from './initialState';

it('returns default state', () => {
  expect(logReducer(undefined, {} as LogActionTypes)).toEqual(initialState);
});

it('appends log data to the stack', () => {
  expect(
    logReducer(initialState, {
      type: APPEND_LOG_ENTRY,
      message: 'test',
    } as LogActionTypes)
  ).toEqual({ ...initialState, currentLogEntry: 'test' });
});

it('commits log entries to the stack', () => {
  expect(
    logReducer({ ...initialState, currentLogEntry: 'test' }, {
      type: COMMIT_LOG_ENTRY,
    } as LogActionTypes)
  ).toEqual({ ...initialState, log: ['test'] });
});
