import React from 'react';
import { Subject } from 'rxjs';
import { RenderResult } from '@testing-library/react';
import { render } from 'tools/test-utils';

import ArmorForm from './ArmorForm';

const mockArmor = { dr: 0, id: 0 };
const mockState = { armorStack: [mockArmor] };
const mockCollapse = new Subject<void>();

it('matches snapshot', async () => {
  const component: RenderResult = render(
    <ArmorForm armor={mockArmor} collapse={mockCollapse} />,
    {
      initialState: mockState,
    }
  );
  expect(component).toMatchSnapshot();
});
