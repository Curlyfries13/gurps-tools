import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer, { createReducer } from './reducers';

const middleware =
  process.env.NODE_ENV !== 'production'
    ? [require('redux-immutable-state-invariant').default(), thunk]
    : [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: true,
});

export const createStore = (initialState: any) => {
  return configureStore({
    reducer: createReducer(initialState),
    middleware: middleware,
    devTools: true,
  });
};

export * from './reducers';
export default store;
