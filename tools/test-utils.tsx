// Using code from https://redux.js.org/recipes/writing-tests#connected-components
import React from 'react';

// test-utils.js
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Import your own reducer
//
// console.log(React.createElement);

import * as reducer from 'src/redux/reducers';


const customRender = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) => {
  const Wrapper =({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
