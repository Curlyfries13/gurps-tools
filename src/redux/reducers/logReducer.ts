import * as actionTypes from '../actions/actionTypes';
import { LogActionTypes } from '../actions/actionTypes';
import initialState from './initialState';

export default function logReducer(
  state = initialState,
  action: LogActionTypes
) {
  switch (action.type) {
    case actionTypes.APPEND_LOG_ENTRY:
      if (action.message === undefined) {
        return;
      }
      let logEntry = '';
      if (state.currentLogEntry === '') {
        logEntry = action.message;
      } else {
        logEntry = state.currentLogEntry.concat(' ', action.message);
      }
      return { ...state, currentLogEntry: logEntry };
    case actionTypes.COMMIT_LOG_ENTRY: {
      const newLog = state.log.concat(state.currentLogEntry);
      return { ...state, log: newLog, currentLogEntry: '' };
    }
    default:
      return state;
  }
}
