import React from 'react';

import TextInput from '../common/TextInput';
import ArmorForm from './ArmorForm';

const CalcForm = ({}) => {
  return (
    <div className='container card'>
      <div className='row g-2 m-2 justify-content-center'>
        <div className='col-md-2 col-6'>
          <TextInput name='HP' id='HP' label='HP' accLabel='Hit Points' />
        </div>
        <div className='col-md-2 col-6 '>
          <TextInput
            name='DR'
            id='DR-sum'
            label='DR'
            accLabel='Damage Resistence'
          />
        </div>
      </div>
      <ArmorForm name='test-armor' id='test-armor-1' />
    </div>
  );
};

export default CalcForm;
