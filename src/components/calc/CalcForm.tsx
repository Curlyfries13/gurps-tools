import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { addArmor, removeArmor } from '../../redux/actions/armorActions';

import { Armor } from '/src/types';
import TextInput from '../common/TextInput';
import ArmorForm from './ArmorForm';
import SummaryDR from './SummaryDR';

const CalcForm = ({armorStack, hp, currHP, summaryDR, addArmor, removeArmor} : Props) => {
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
  const [dr, setDR] = useState(summaryDR ? summaryDR : 0);

  const defaultArmor: Armor = {
    id: idCount,
    name: 'Armor',
    dr: 0,
    ablative: false,
    ablateBase: 0,
    vulnerabilities: [],
  };

  function handleAddArmor() {
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
      { armorStack.map((armor: Armor) => {
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

interface RootState {
  armorStack: Array<Armor>;
  hp: number;
  currHP: number;
}

function mapStateToProps(state: RootState) {
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

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>

interface Props extends ReduxProps {
  hp: number;
  currHP: number;
  summaryDR: number;
};


export default connector(CalcForm);
