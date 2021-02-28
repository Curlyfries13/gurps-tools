import React from 'react';
import { RenderResult } from '@testing-library/react';
import { render } from 'tools/test-utils';

import AblateField from './AblateField';

const mockArmor = { dr: 0, id: 0 };
const mockState = { armorStack: [mockArmor] };

it('matches snapshot', async () => {
  const component: RenderResult = render(<AblateField armorId={0} />, {
    initialState: mockState,
  });
  expect(component).toMatchSnapshot();
});
