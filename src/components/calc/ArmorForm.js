import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

import TextInput from '../common/TextInput';
import DRField from './DRField';

const ArmorForm = ({ armor, removeArmor }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='container card card-body'>
      <div className='row g-2 mb-2'>
        <div className='col'>
          <button className='btn btn-primary' type='button' onClick={toggle}>
            {isOpen ? 'Collapse ' + armor.name : 'Open ' + armor.name}
          </button>
        </div>
        <div className='d-grid col-3 col-md2'>
          <button
            className='btn btn-outline-danger'
            type='button'
            onClick={() => removeArmor(armor)}
          >
            <i className='bi bi-shield-slash'></i>
          </button>
        </div>
      </div>
      <Collapse className='row' isOpen={isOpen}>
        <DRField armorId={armor.id} />
      </Collapse>
    </div>
  );
};

export default ArmorForm;
