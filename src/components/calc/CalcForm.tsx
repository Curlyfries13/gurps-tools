import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addArmor, removeArmor } from '../../redux/actions/armorActions';

import TextInput from '../common/TextInput';
import ArmorForm from './ArmorForm';
import SummaryDR from './SummaryDR';

const CalcForm = ({
  armorStack,
  addArmor,
  removeArmor,
  propHP,
  propCurrHP,
  propDR,
}) => {
  // This is a crude way to generate unique id's. Use the largest known ID as
  // the starting point.
  const [idCount, setIdCount] = useState(
    armorStack.length === 0
      ? 0
      : armorStack.reduce((prev, current) => {
          return prev.id > current.id ? prev : current;
        }).id
  );

  // only used for summary DR convenience interaction
  const [dr, setDR] = useState(propDR ? propDR : 0);

  const defaultArmor = {
    id: idCount,
    name: 'Armor',
    dr: 0,
    ablative: false,
    ablateBase: 0,
    vulnerabilities: [],
  };

  function handleAddArmor(event) {
    if (armorStack.length === 0) {
      // Set DR to current DR if initializing stack
      addArmor({ ...defaultArmor, dr });
    } else {
      addArmor(defaultArmor);
    }
    setIdCount(idCount + 1);
  }

  return (
    <div className='container card'>
      <div className='row g-2 m-2'>
        <div className='col-md-4 col-6'>
          <TextInput name='Name' id='Name' label='Name' accLabel='Name' />
        </div>
      </div>
      <div className='row g-2 m-2 justify-content-center'>
        <div className='col-md-2 col-6'>
          <TextInput
            name='HP'
            id='HP'
            label='HP'
            labelClass='d-flex justify-content-center'
            accLabel='Hit Points'
          />
        </div>
        <div className='col-md-2 col-6 '>
          <SummaryDR propDR={dr} setPropDR={setDR} />
        </div>
      </div>
      <div className='row g-2 m-2'>
        <div className='col-md-1 col-3'>
          <button
            className='btn btn-outline-success'
            onClick={() => handleAddArmor()}
          >
            <i className='fs-3 d-flex align-items-top bi bi-shield-fill-plus'></i>
          </button>
        </div>
      </div>
      {armorStack.map((armor) => {
        return (
          <ArmorForm
            key={armor.id}
            armor={armor}
            removeArmor={removeArmor}
          ></ArmorForm>
        );
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    armorStack: state.armorStack,
    hp: state.hp,
    currHP: state.currHP,
  };
}

const mapDispatchToProps = {
  addArmor,
  removeArmor,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalcForm);
