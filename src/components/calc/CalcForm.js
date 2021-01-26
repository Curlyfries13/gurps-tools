import React from 'react';

import TextInput from '../common/TextInput';

const CalcForm = ({}) => {
  return (
    <div className='container card'>
      <div className='row g-2 m-2 justify-content-center'>
        <div className='col-2'>
          <TextInput name='HP' id='HP' label='HP' accLabel='Hit Points' />
        </div>
        <div className='col-3'></div>
        <div className='col-2'>
          <TextInput
            name='DR'
            id='DR-sum'
            label='DR'
            accLabel='Damage Resistence'
          />
        </div>
      </div>
    </div>
  );
};

export default CalcForm;
