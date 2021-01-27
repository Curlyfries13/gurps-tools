import React, { useState } from 'react';
// centralize this dependency
import { Dropdown } from 'bootstrap';

import TextInput from '../common/TextInput';

const ArmorForm = ({ name, id }) => {
  return (
    <div className='container'>
      <div className='row mb-2'>
        <button
          className='btn btn-primary'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={'#' + id}
          aria-expanded='true'
          aria-controls={id}
        >
          {'Collapse ' + name}
        </button>
      </div>
      <div className={'row collapse.show'} id={id}>
        <div className='card card-body'>
          <TextInput
            name={'DR ' + name}
            id={id + '-DR'}
            label='DR'
            accLabel={name + ' Damage Resistence'}
          />
        </div>
      </div>
    </div>
  );
};

export default ArmorForm;
